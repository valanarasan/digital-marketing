# Brand files

The Hiranmaye Digital logo, from the original artwork the client supplied
(`hiranmaye-digital-logo-original.jpg`, 1600 × 1131). Use these files, never a redraw.

| File | What it is |
| --- | --- |
| `hiranmaye-digital-logo-original.jpg` | The original, untouched. |
| `hiranmaye-digital-logo.svg` | Vector of the original composition, on its navy ground (`#101f36`). |
| `hiranmaye-digital-logo-transparent.svg` | The same logo, transparent background, cropped to the artwork. |
| `hiranmaye-digital-logo-4k.png` | 4K master: 3840 × 2715, on navy, rendered from the vector. |
| `hiranmaye-digital-logo-4k-transparent.png` | 4K master, transparent, cropped: 3840 × 1939. |

Colours sampled from the original: gold `#cf9b2b`, white `#ffffff`, navy `#101f36`.

## How the vector was made

The logo is flat colour, so it was traced rather than AI-upscaled: each band (lotus, name,
tagline) was unmixed from the navy ground into a coverage map, enlarged 4×, and traced with
potrace at half coverage. Rendered back at the original size and compared pixel by pixel, the
vector covers the same pixels as the original at 97.5% (lotus 98.2%, name 98.0%, tagline
95.0% — its strokes are hairline, so edges weigh more), with a mean colour difference of about
1 level in 765.

## On the site

`public/brand/` holds three cuts of the same drawing, served through `BrandLogo`:
`logo.svg` (full, with tagline — footer), `logo-name.svg` (lotus and name — header, where the
tagline would not read), `mark.svg` (lotus — hero masthead, background watermarks, Who we are).
`public/favicon.svg` and `public/apple-touch-icon.png` are the lotus on navy.
