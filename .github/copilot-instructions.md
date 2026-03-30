# Project Guidelines

## Code Style
- Follow existing naming conventions in HTML/CSS/JS: BEM-like selectors and state classes such as `is-active`, `section--is-active`, and `slider--item-center`.
- Treat `assets/css/main.sass` as the style entry point. Add new styles in the appropriate partial under `assets/css/base/`, `assets/css/layouts/`, or `assets/css/modules/`, then import from `assets/css/main.sass`.
- Prefer minimal, targeted edits in this legacy static site. Avoid introducing new frameworks or build systems unless explicitly requested.

## Architecture
- This repository is a single-page static landing site centered on `index.html`.
- Main behavior is in `assets/js/functions.js` (scroll/swipe/keyboard section navigation, outer nav modal state, work slider behavior).
- Production assets are static files under `assets/`:
  - Styles: SASS sources under `assets/css/` and generated CSS in `assets/css/main.css`
  - Scripts: source in `assets/js/functions.js`, minified bundle in `assets/js/functions-min.js`, vendor libs in `assets/js/vendor/`

## Build and Test
- There is no package-based build or test pipeline in this repo.
- Local preview is typically done with VS Code Live Server (workspace setting uses port 5501).
- If you change SASS or JavaScript source files, also update generated artifacts before considering work complete:
  - SASS changes in `assets/css/**/*.sass` or `assets/css/**/*.scss` should be reflected in `assets/css/main.css`.
  - JavaScript changes in `assets/js/functions.js` should be reflected in `assets/js/functions-min.js` when minified output is expected.

## Conventions
- Keep section and navigation behavior class-driven (`.section--next`, `.section--prev`, `.is-active`) so transitions remain consistent.
- Preserve compatibility with current dependencies (jQuery 2.2.4 and Hammer.js) unless migration is explicitly requested.
- For form-related edits:
  - Contact/hire flows submit to Firebase Realtime Database from `index.html`.
  - Keep required-field validation behavior and do not remove existing network/error handling paths without replacement.

## Pitfalls
- This repo mixes `.sass` and `.scss` files. Match the syntax style of the file being edited.
- The site relies heavily on viewport-based layout and JS-controlled section state; small class-name changes can break navigation or animations.
- CDN fallback for jQuery is present in `index.html`; keep local vendor script references valid.
