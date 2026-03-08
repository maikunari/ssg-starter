# SETUP.md — Starting a New Client Site

Clone this repo, follow these steps, and you're building in minutes.

---

## 1. Clone & Install

```bash
git clone https://github.com/maikunari/ssg-starter.git client-name
cd client-name
npm install
```

---

## 2. Create the Client Repo on GitHub

Create a new empty repo at `github.com/maikunari/client-name`, then point your local clone at it:

```bash
git remote set-url origin https://github.com/maikunari/client-name.git
git push -u origin main
```

---

## 3. Set the Color Scheme

Open `src/assets/css/abstracts/_schemes.scss`.

1. Copy an existing scheme as your starting point (pick the closest vibe):
   - `artisan` — warm, golden, premium services
   - `modern` — sleek, tech, blue
   - `elegant` — sophisticated, law/consulting
   - `minimalist` — clean, white, editorial
   - `vibrant` — bold, energetic
   - `luxury` — dark, high-end
   - `connectionpoint` — green + purple, coaching/wellness

2. Rename it to match your client (e.g. `acmecorp`)

3. Update these ~5 values:
   - `primary` — main brand color (CTAs, headings, links)
   - `accent` — secondary color
   - `dark` — footer/dark sections
   - `footer-bg` — footer background
   - `header-color` — header text color

4. Update `$active-scheme: 'acmecorp';` at the bottom of the file

---

## 4. Update Client Info

Edit `src/_data/client.json`:

```json
{
  "name": "Client Name",
  "domain": "clientname.com",
  "phone": "+1 (555) 000-0000",
  "email": "hello@clientname.com",
  "address": "123 Main St, City, State 00000",
  "hours": "Mon–Fri: 9 AM – 5 PM"
}
```

---

## 5. Add Brand Assets

Drop these into `src/assets/images/`:
- `logo-color.png` — full color logo (transparent background preferred)
- `logo-light.png` — white/reversed logo for dark backgrounds (transparent background)
- `favicon.ico` → also copy to `src/assets/favicons/favicon.ico`

---

## 6. Update CMS Config

Edit `src/admin/config.yml`:

```yaml
backend:
  name: github
  repo: maikunari/client-name   # ← update this
  branch: main
```

For non-technical clients using Google login, set up `maikunari/sveltia-auth-proxy` and update the backend config accordingly.

---

## 7. Create the `_specs/` Directory

Before writing any HTML, build your spec files:

```
_specs/
  ROADMAP.md              ← build phases + page list
  home-copy.txt           ← all homepage text, word for word
  home-blueprint.md       ← section-by-section layout plan
  about-copy.txt
  about-blueprint.md
  [page]-copy.txt         ← one per page
  [page]-blueprint.md
```

See `CLAUDE.md` for blueprint rules and the spec-first workflow. This is the most important step — invest time here before touching HTML.

---

## 8. Build

```bash
npm run build   # builds to public/
npm start       # local dev server on :8080
```

---

## 9. Connect Netlify

1. Push to GitHub
2. In Netlify: Add new site → Import from GitHub → select repo
3. Build command: `npm run build`
4. Publish directory: `public`
5. Deploy

---

## 10. Before Launch Checklist

- [ ] All internal links resolve (no 404s)
- [ ] All image paths exist in `src/assets/images/`
- [ ] `src/admin/config.yml` points to correct repo
- [ ] Delete unused ssg-starter pages (gallery, reviews, services, terms) if not needed
- [ ] Create `src/_redirects` if migrating from existing site
- [ ] Hard-refresh to verify new assets load
- [ ] DNS cutover (client's call)

---

## Component Reference

See `theme-components.md` for the full catalog of 27 components with HTML, modifiers, and content slots.

**Key rule:** Only use class names from `theme-components.md`. No improvising.
