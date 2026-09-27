# Per-frame mouth openness (0..1) from speech loudness, for lip sync.
import json, subprocess, sys
import numpy as np, imageio_ffmpeg

FPS, DELAY, DUR = 30, 0.08, 3.0
pcm = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-v", "error", "-i", "speech.mp3",
                      "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], capture_output=True).stdout
x = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
sr, n = 16000, int(DUR * FPS)
env = []
for i in range(n):
    t = i / FPS - DELAY
    a, b = int(max(t - 0.02, 0) * sr), int(max(t + 0.03, 0) * sr)
    seg = x[a:b]
    env.append(float(np.sqrt(np.mean(seg ** 2))) if len(seg) else 0.0)
env = np.array(env)
env = np.clip((env - 0.01) / (np.percentile(env, 95) - 0.01), 0, 1) ** 0.7
sm = np.convolve(env, [0.25, 0.5, 0.25], mode="same")
json.dump([round(v, 3) for v in sm], open("mouth.json", "w"))
print(len(sm), " ".join(f"{v:.1f}" for v in sm))
