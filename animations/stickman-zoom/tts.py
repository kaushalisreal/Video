import certifi, sys
certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
import ssl
_orig = ssl.create_default_context
def ctx(*a, **k):
    k.pop("cafile", None)
    return _orig(*a, cafile="/root/.ccr/ca-bundle.crt", **k)
ssl.create_default_context = ctx
import edge_tts.communicate as c
c._SSL_CTX = ctx()
import edge_tts, asyncio
async def main(text, voice, out, subs):
    comm = edge_tts.Communicate(text, voice, rate="-4%", boundary="WordBoundary")
    sm = edge_tts.SubMaker()
    with open(out, "wb") as f:
        async for ch in comm.stream():
            if ch["type"] == "audio": f.write(ch["data"])
            elif ch["type"] in ("WordBoundary", "SentenceBoundary"): sm.feed(ch)
    open(subs, "w").write(sm.get_srt())
asyncio.run(main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]))
