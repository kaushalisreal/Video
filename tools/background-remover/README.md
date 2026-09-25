# Cutout: lightweight background remover

This is a single HTML file with no install, no ML model, and no internet connection needed. Images never leave your PC.

**Open it:** double-click `index.html` to open it in Chrome or Edge.

## How it works

The tool is made for cartoon or illustration images with outlines on a plain background.

1. It detects the background color from the image border.
2. It flood-fills from the edges, like Photoshop's Magic Wand with *Contiguous* on. It stops at the drawing's outlines, so a **white face inside an outline is never removed**.
3. It smooths the edges: anti-aliased outline pixels are un-mixed from the background ("color to alpha"), so no white halo is left.
4. The PNG is exported at the **exact original size**. Every kept pixel has its **exact original color**, with no resizing or re-compression.

## Workflow

1. Click **Add images…** or drag in many images at once. They are all processed automatically.
2. **Pink stripes** mark white areas that are fully enclosed by the drawing and are kept, such as the face or the gaps between bed bars. Click the gaps with **Wand remove (W)**.
3. Fix details with **Erase brush (E)** or **Restore brush (B)**. **Wand restore (Q)**, or Shift+click, brings back a removed area.
4. Click **Download all (ZIP)** or **Save all to folder…**.

## Settings

| Setting | What it does |
|---|---|
| Tolerance | How close to the background color a pixel must be to get removed. Raise it for JPEG noise or soft shadows. |
| Background color | Auto-detected. Use **Pick bg color (I)** if the background isn't white. |
| Edge smoothing | Hard, or 1–3 px of anti-aliased edge cleanup. |
| Auto-remove small enclosed areas | Also removes enclosed areas smaller than *Max size*. It is off by default because eye whites are small enclosed areas too. |
| Apply settings to all | Copies the current image's settings to every image. Your manual clicks are kept. |

Shortcuts: mouse wheel zooms, Space-drag pans, `[` and `]` change the brush size, ← and → switch images, Ctrl+Z undoes, and holding O shows the original.
