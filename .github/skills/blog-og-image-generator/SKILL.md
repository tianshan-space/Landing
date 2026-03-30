---
name: blog-og-image-generator
description: "Generate or update blog post OG images (Open Graph / Twitter) for this static site. Use when user asks to create OG banners, refresh social preview images, regenerate PNG from SVG, keep branding consistency, or add OG image metadata for blog posts."
---

# Blog OG Image Generator

## Purpose
Create and maintain per-post OG images for blog pages in Georgian and English, aligned to the site's existing visual style.

## Use When
- User asks to create OG images for blog posts.
- User asks to regenerate broken PNG files from SVG sources.
- User asks to keep OG images visually consistent with existing brand style.
- User asks to wire OG/Twitter/JSON-LD image references in blog HTML files.

## Repository Conventions
- OG source and outputs live in assets/img/og/.
- Preferred source format: SVG (*.svg).
- Preferred delivery format: PNG (*.png) at 1200x630.
- Keep the existing blue-violet brand look and top-right logo placement.
- Keep subtle digital motif (grid/circuit lines), decorative only.

## Standard Workflow
1. Identify target post slug and language (ka/en).
2. Create or edit SVG in assets/img/og/ with a post-specific filename.
3. Reuse established composition:
   - 1200x630 canvas
   - blue-violet base palette
   - subtle digital lines
   - top-right logo
   - title/subtitle text hierarchy
4. Remove locale badges unless explicitly requested.
5. Regenerate PNG from SVG.
6. Verify PNG format and exact size.
7. If requested, update blog page metadata:
   - og:image
   - twitter:image
   - JSON-LD image

## Safe PNG Regeneration (macOS in this repo)
When ImageMagick/Ghostscript is unavailable, use native conversion:

- Convert one file:
  - sips -s format png assets/img/og/<name>.svg --out assets/img/og/<name>.png
- Convert all files:
  - for f in assets/img/og/*.svg; do out="${f%.svg}.png"; sips -s format png "$f" --out "$out" >/dev/null; done
- Verify dimensions:
  - /opt/homebrew/bin/magick identify -format '%f %m %wx%h\n' assets/img/og/*.png

## Quality Checklist
- Text is readable at feed preview size.
- No clipped text or distorted logo.
- PNG is exactly 1200x630.
- Visual style matches other OG images in the repo.
- Blog pages reference the correct post-specific image URL.

## Naming Pattern
- Georgian post: blog-<slug>-ka.svg and blog-<slug>-ka.png
- English post: blog-<slug>-en.svg and blog-<slug>-en.png

## Notes
- Prefer editing existing templates for consistency.
- Keep changes minimal and post-specific unless user asks for global redesign.
