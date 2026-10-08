# Team photos

The client's own photos of the founder and two board members, as supplied (8 Oct 2026),
upscaled for sharp display on high-density screens. Nothing is retouched: no smoothing,
colour changes or background edits.

| Person | Supplied | Master here | On the site (`public/team/`) |
| --- | --- | --- | --- |
| Vijayalakshmi Girish (founder) | 912 × 1600 | 1824 × 2280, head to waist | `vijayalakshmi-girish.webp`, 900 × 1125 (4:5) |
| Saji Philip (board) | 800 × 800 | 1600 × 1600 | `saji-philip.webp`, 900 × 720 (5:4) |
| Abhishek Mishra (board) | 670 × 576 | 1340 × 1152 | `abhishek-mishra.webp`, 900 × 720 (5:4) |

## How they were made

1. **Upscale 2×** with EDSR (Lim et al., 2017; the `EDSR_x2.pb` model from
   github.com/Saafke/EDSR_Tensorflow, run through OpenCV's `dnn_superres`). EDSR is trained to
   reproduce the true detail of a photo rather than to "enhance" it, so faces stay as they are;
   it simply looks crisper than a plain resize at 2×. The larger photos were processed in
   overlapping tiles (up to 460 px, each with 64 px of surrounding context, only the centre
   kept) so they fit in memory without seams. The founder's photo was cropped to 4:5 (head to
   waist) before upscaling.
2. **Crop** to the frame the site shows: 4:5 for the founder's portrait, 5:4 for the cards.
3. **Export** as WebP (quality 82) at 900 px wide — twice the largest size a card or the
   founder portrait is shown at.

The masters (`*-2x.jpg`, JPEG quality 92) are kept so a different crop or size can be made
later without upscaling again. To add someone's photo, export it the same way, put it in
`public/team/`, and give that person a `photo` in `src/content/about.ts`; anyone without one
keeps their initials.
