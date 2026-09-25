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
2. **Smart gaps** removes the white seen between bed bars automatically (blue stripes). **Pink stripes** mark enclosed white areas that were kept, such as the face. Click any that are really background with **Wand remove (W)**; Shift+click a blue area to bring it back.
3. For leftover white bits, for example between hair strands, use **Lasso select (L)**: draw around the area and only the white pixels inside are removed, so the hair stays. Lasso can also *Remove all* (Ctrl+drag) or *Restore* (Shift+drag).
   **Lasso wand restore (M)** works like clicking **Wand restore** on many areas at once. Draw a loop around several areas that were removed by mistake, and each one comes back whole. An area counts if at least half of it is inside the loop. Shift+drag does the opposite: it removes every white area inside the loop.
4. Fix details with **Erase brush (E)** or **Restore brush (B)**. **Wand restore (Q)**, or Shift+click, brings back a removed area.
5. Click **Download all (ZIP)** or **Save all to folder…**.

## Settings

| Setting | What it does |
|---|---|
| Tolerance | How close to the background color a pixel must be to get removed. Raise it for JPEG noise or soft shadows. |
| Background color | Auto-detected. Use **Pick bg color (I)** if the background isn't white. |
| Edge smoothing | Hard, or 1–3 px of anti-aliased edge cleanup. |
| Smart gaps (on by default) | Removes white areas seen between bars or rails. It compares how thick the "wall" between an enclosed area and the outside is with the outline thickness. A gap sits behind one thin bar; a face sits behind only its outline, or deep inside the drawing. Guesses show as blue stripes, and Shift+click undoes a wrong one. |
| Auto-remove small enclosed areas | Also removes enclosed areas smaller than *Max size*. It is off by default because eye whites are small enclosed areas too. |
| Apply settings to all | Copies the current image's settings to every image. Your manual clicks are kept. |

Shortcuts: mouse wheel zooms, Space-drag pans, `[` and `]` change the brush size, ← and → switch images, Ctrl+Z undoes, and holding O shows the original.
