# Another Vision brand: shared context for Claude

Another Vision (anothervisionlab.com) is an AI-native Framer web studio for real estate developers and agencies in Bali, Dubai and the US/EU. This repo is the shared brand workspace. Read this file before you change anything.

## Locked decisions (don't reopen without asking)

- **Logomark: mark C.** A converging dot iris: 3 rings of dots pulled strongly toward an off-centre pupil, with no dots touching. A simplified 2-ring "small cut" is used below 48px.
- **Wordmark:** Onest Light (300), lowercase "another vision", tracking -0.03em, with a custom **th ligature** (the t crossbar joins the h stem). The letters are outlined in the SVGs, so the wordmark doesn't need the font installed.
- **Typeface: Onest.** Light 300 for headlines and big numbers, Regular 400 for body text, Medium 500 for small UI text. Geist is not part of the brand.
- **Selected colour board: A1.2** (`explorations/colour-boards/A1.2-area-chart-SELECTED.png`).
  - Night `#0E1A2B`, Deep `#091321`, Cream `#F4EDE4`, Haze `#C9C2BA`, Ember `#E5602E`, Sky `#9CC6DD`.
  - Known gap: the coloured logo files in `brand/logo/` still use the old palette (Ink `#16181D`, Horizon `#2F55D4`, Ember `#FF6A3D`). Recolouring them to A1.2 is open work.

## What the owner likes and dislikes

- **Likes:**
  - Blurred photographic backgrounds with frosted glass cards on top.
  - White line illustrations.
  - Big, zoomed-in images with annotations on them.
  - Thin, light type.
  - Orange used as an accent only.
  - Real project imagery.
- **Dislikes:**
  - Generic tile grids.
  - The same AI villa image reused.
  - Too much blue (the "Night Instrument" board) or too much orange (the "Ember Forward" board).
  - Obvious font choices, serifs, and wide display faces.
  - Hard-sell buttons ("Book a call") and slogans like "Scale your vision".
- **Avoid these common AI-design patterns:**
  - Cream background with a serif.
  - Monospaced uppercase labels everywhere.
  - Metadata strings separated by middle dots.
  - Thin-rule newspaper-style layouts.
- **Working style:** iterate close to what was approved; don't jump to new directions without asking.
- **Client claims:** don't invent client metrics. Only approved quotes and figures may appear. For Alex Villas, only the Alex Shtefan quote is approved; the "6 weeks" figure on its own is not.

## Figma (the visual source of truth)

- **Master file:** https://www.figma.com/design/IBmXf1HG2ig3bLhm5ufD4L/Another-VIsion-Master-File (on the Figma Starter plan, which allows only 3 pages).
- **Pages:**
  - **01 Brand:** cover, logo (editable vectors), the colour variables ("Brand colour" collection), and the Onest/ text styles.
  - **02 Explorations:** colour boards, Instagram sets including editable Alex Villas posts, and LinkedIn banners.
  - **03 References & Archive:** references and earlier logo rounds.
- Use the Figma MCP tools to read the file and make edits. Bind fills to the colour variables and text to the Onest/ styles rather than typing hex values.

## Layout

| Path | What |
|---|---|
| `brand/logo/svg`, `brand/logo/png` | Final logo, logomark, app icons, favicons, LinkedIn avatar |
| `brand/logo/logo-final-sheet.png` | One-page overview of the logo system |
| `brand/fonts/onest` | Onest TTFs + OFL licence |
| `explorations/colour-boards` | v2 → v3 → v4 (A1 cream/night with glass, A2 warm haze, A3) → A1.1/1.2/1.3 |
| `explorations/logo` | Wordmark, ligature and font rounds |
| `explorations/social` | Instagram post sets (Alex Villas, Hematonix-style) |
| `explorations/linkedin-banner` | LinkedIn banner options C1–C3, B3 |
| `source/boards` | HTML sources for the boards and posts, with images in `img/` and client logos in `logos/` |
| `references/image-prompts.md` | Midjourney prompts for brand imagery |

## How to render a board

Serve `source/boards/` over HTTP, because the pages `fetch()` their SVGs. Then screenshot with headless Chrome:

```bash
cd source/boards && python3 -m http.server 8767
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=out.png --window-size=1080,1350 --virtual-time-budget=4000 "http://localhost:8767/insta-avg.html#p1"
```

Adding `#p1`, `#p2` or `#p3` to the URL renders a single post.

## Collaboration

- Two people work in this repo, each with their own Claude Code.
- Pull before you start and commit small, clearly described changes.
- Put new explorations in `explorations/<topic>/` and don't overwrite approved files.
- Record new decisions in this file.
