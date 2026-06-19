# Shivam Tyagi — Portfolio

A modular, component-based personal portfolio built with vanilla HTML, CSS, and ES module JavaScript. No build step.

## How to run

Because each section's HTML is loaded at runtime via `fetch()`, the page **must be served over HTTP**. Opening `index.html` directly via `file://` will fail (`fetch` is blocked on the `file://` scheme).

Pick any one of these:

```bash
# Python 3 (already on macOS)
python3 -m http.server 5500

# Node (if you have it)
npx serve .

# VSCode: install the "Live Server" extension and click "Go Live"
```

Then open the printed URL (e.g. `http://localhost:5500`).

## Architecture

```
Portfolio_Shivam/
├── index.html                  # Lean shell with <div data-component> placeholders
├── assets/
│   ├── css/
│   │   ├── styles.css          # Entry — @imports every file below in cascade order
│   │   ├── base/               # Tokens, reset, shared button + section primitives, global animations
│   │   ├── components/         # One CSS file per visible component
│   │   └── legacy/             # Preserved-but-unused styles from the original monolithic file
│   ├── images/
│   └── js/
│       ├── main.js             # App entry — boots ComponentLoader, then initializes every class
│       ├── core/
│       │   └── ComponentLoader.js   # Fetches each component's HTML fragment and injects it
│       ├── behaviors/          # Cross-cutting behaviors (scroll effects, reveal, road)
│       └── components/
│           └── <name>/
│               ├── <name>.html # HTML fragment injected into <div data-component="<name>">
│               └── <Class>.js  # One class per piece of logic that originally lived in main.js
```

### Components

| Name              | HTML | Behavior class(es)                                        |
|-------------------|------|-----------------------------------------------------------|
| `navbar`          | ✓    | `NavPill`, `MobileMenu`                                   |
| `hero`            | ✓    | `HeroAnimations`, `TypingEffect`, `HeroStageCycle`, `Hero3DTilt`, `AICore3D` |
| `skills-marquee`  | ✓    | — (pure CSS animation)                                    |
| `ai-intelligence` | ✓    | —                                                         |
| `projects`        | ✓    | `ProjectModal`                                            |
| `about`           | ✓    | —                                                         |
| `services`        | ✓    | —                                                         |
| `process`         | ✓    | —                                                         |
| `contact`         | ✓    | —                                                         |
| `footer`          | ✓    | —                                                         |
| `back-to-top`     | ✓    | (visibility handled by global `ScrollEffects`)            |
| `project-drawer`  | ✓    | `ProjectDrawer`                                           |

Global behaviors live in `assets/js/behaviors/`:

- `ScrollEffects` — navbar shrink, back-to-top visibility, active nav link
- `ScrollReveal` — section + child IntersectionObserver staggered reveals
- `HighVisibilityRoad` — generates the global SVG road (target nodes are no longer in the document; preserved verbatim)

### Adding a new component

1. Create `assets/js/components/<name>/<name>.html` with the section markup.
2. Create `assets/css/components/<name>.css` and `@import` it from `assets/css/styles.css`.
3. (Optional) Create a behavior class `assets/js/components/<name>/<Class>.js` exposing `init()`.
4. Add `<div data-component="<name>"></div>` to `index.html` where it should render.
5. If you added a behavior class, import it and call `new Class().init()` from `assets/js/main.js`.
