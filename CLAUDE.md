# CLAUDE.md — SSG Starter Build Instructions

This file tells you (Claude Code / Gemini / any coding agent) how to build a client site using this theme. Read it before touching any files.

---

## The Core Rule: Spec First, Build Second

**Never write HTML for a page until you have both:**
1. `_specs/[page]-copy.txt` — all the text content, word for word
2. `_specs/[page]-blueprint.md` — the section-by-section layout plan

Build only what the spec says. No improvising components, no inventing class names, no hallucinated content.

---

## The Build Phases

### Phase 1: Component Factory
Before building any pages, write SCSS partials for any new components the blueprints require and import them into `src/assets/css/main.scss`. Refer to `theme-components.md` for the full component vocabulary. If a new component is needed, add it to `theme-components.md` before building.

### Phase 2: Homepage Pilot
Build the homepage first. Verify: correct components used, header/footer not duplicated, all image paths resolve.

### Phase 3: Hub Pages
Build the core navigation pages (About, Contact, Events, Products, section parents).

### Phase 4: Sub-Page Batches
Build nested pages in batches — they typically share identical layouts, so do them together.

### Phase 5: Final Audit
Check all internal links, missing images, CMS config, and unused template pages before handoff.

---

## Component Vocabulary

**Only use class names from `theme-components.md`.** Never invent a class name. If a design element doesn't map to an existing component, add the component to `theme-components.md` first (with HTML structure, modifiers, content slots), then build it.

---

## Blueprint Rules (Critical)

### Section splits must be explicit
When a page has multiple content-block sections, the blueprint **must** number each paragraph and specify exactly which paragraphs go in which section. "Several paragraphs of bio" is not enough — agents will put everything in one block.

**Bad:**
```
Section 2: .content-block — Traci's biography (multiple paragraphs)
```

**Good:**
```
Section 2: .content-block (image left, text right)
- Text: FIRST 3 paragraphs ONLY:
  1. "As long as I can remember..."
  2. "Therefore, I was drawn to dance..."
  3. "I recognize not everyone..."

Section 3: .content-block--reversed ⚠️ SEPARATE SECTION — do not merge with Section 2
- Text: REMAINING 6 paragraphs:
  1. "She uses her expertise..."
  ...
```

### Mark merge-risk sections
Use `⚠️ SEPARATE SECTION` warnings in blueprints wherever two adjacent content-blocks could be accidentally collapsed into one.

### Exclude header and footer from blueprints
Global `header.html` and `footer.html` are injected by the layout. Never include them in page blueprints or page HTML.

---

## Image Paths

All images live in `src/assets/images/`. Reference them as `/assets/images/filename.jpg` in HTML.

**Subdirectory structure:**
- `/assets/images/blog/` — blog post images
- `/assets/images/how-we-help/` — modality images (heartmath.jpg, net.jpg, brainspotting.jpg, cbt.jpg)
- `/assets/images/who-we-serve/` — audience images (athletes.jpg, dancers.jpg, etc.)
- `/assets/images/logos/` — cert badges and partner logos
- `/assets/images/logo-color.png` — full color logo
- `/assets/images/logo-light.png` — white/transparent logo (for dark backgrounds)

---

## Color Scheme

Colors live in `src/assets/css/abstracts/_schemes.scss`. Each project gets its own named scheme.

**To set up a new project:**
1. Add a new scheme entry (copy an existing one as a base)
2. Update `$active-scheme` to your scheme name
3. Adjust the ~5 primary color values

**Never hardcode hex values in component files** — always use scheme variables via the `variables` module.

---

## CMS (Sveltia)

- Config lives at `src/admin/config.yml`
- After cloning to a new client repo, update `repo:` to point to the new repo name
- Auth: use `maikunari/sveltia-auth-proxy` for Google login (non-technical clients)

---

## Netlify

`netlify.toml` is pre-configured with:
- Build command: `npm run build`
- Publish dir: `public`
- Security headers
- Cache headers
- Admin iframe headers for CMS

**After connecting to a new repo:** verify the publish dir is `public` not `_site`.

---

## SEO Redirects

If migrating from an existing site (Squarespace, WordPress, old SSG), create `src/_redirects` before launch. Map old URLs to new URLs using Netlify redirect format:

```
/old-page   /new-page   301
/blog/:year/:month/:day/:slug   /blog/:slug   301
```

---

## Common Pitfalls

| Problem | Fix |
|---|---|
| Agent collapses multiple content-blocks into one | Number paragraphs explicitly in blueprint, add ⚠️ SEPARATE SECTION warnings |
| Wrong image showing | Check path — `src/` for dev, `public/` after build. Use `/assets/images/` prefix |
| CMS not loading | Check `src/admin/config.yml` — repo field must match current repo |
| Netlify deploying empty site | Check `netlify.toml` publish dir = `public` |
| Blog post images not showing | Run `npm run build` — blog images are processed by sharp during build |
| Localhost port conflict | `lsof -ti:8080 | xargs kill -9` then `npm start` |
| Push rejected | `git pull --rebase && git push` |

---

## Lessons Learned (from CPC build, March 2026)

- The spec-first system works — invest time in `_specs/` before writing a single line of HTML
- Draftium (or any wireframe tool) = layout reference only. Colors come from the logo, not the wireframe.
- FAQ content on detail pages can be rich — don't assume it's placeholder. Read the wireframe source.
- Agents given vague section descriptions will compress content. Be explicit.
- Blog images need sharp installed: `npm install sharp --save-dev`
- The `baseline-browser-mapping` PostCSS warning is harmless — ignore or update the package
- Node MaxListeners warning during build is harmless — Eleventy + plugins registering cleanup handlers
