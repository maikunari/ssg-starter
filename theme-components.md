# SSG Starter — Theme Components Catalog

> **Purpose:** This file is the strict vocabulary for assembling pages from wireframes. Every UI pattern available in this codebase is documented below. Use only these components when building new pages — do not invent new classes.

---

## 1. Hero

**Main HTML:** `<section class="hero">`

**Modifiers:**
- `hero--parallax` — desktop background-attachment: fixed parallax effect (hides `hero__picture`)
- `hero--minimal` — removes the dark overlay from the background image

**Description:** Full-width top-of-page section with a full-bleed background image and dark overlay. Centered text + CTA buttons. Used exclusively as the homepage landing section.

**Content Slots:**
- `hero__picture` — background image (`{% image %}` shortcode inside)
- `hero__topper` — small all-caps label above the title (primary color)
- `hero__title` — large H1 (white)
- `hero__text` — sub-headline paragraph (white)
- `hero__buttons` — flex container for buttons; accepts `btn--hero-solid` and `btn--hero-transparent`

**Example skeleton:**
```html
<section class="hero">
  <picture class="hero__picture">{% image '...', '...', '', 'eager', '100vw' %}</picture>
  <div class="hero__container">
    <div class="hero__content">
      <span class="hero__topper">Topper Text</span>
      <h1 class="hero__title">Main Headline</h1>
      <p class="hero__text">Sub-headline copy.</p>
      <div class="hero__buttons">
        <a href="/contact" class="btn btn--hero-solid">Primary CTA</a>
        <a href="/about" class="btn btn--hero-transparent">Secondary CTA</a>
      </div>
    </div>
  </div>
</section>
```

---

## 2. Page Banner

**Main HTML:** `<section class="page-banner">`

**Modifiers:** None

**Description:** Interior page header — a shorter full-bleed image section with an overlay. Used at the top of all non-home pages to show the page title. Optionally shows author meta (for blog posts).

**Content Slots:**
- `page-banner__background` — background image + overlay (dark tint auto-applied)
- `page-banner__container` — centers the content
- `page-banner__title` — H1 (white)
- `page-banner__meta` *(optional)* — author image, author name, date (for blog posts)

**Example skeleton:**
```html
<section class="page-banner">
  <div class="page-banner__background">
    {% image './src/assets/images/banner.jpg', 'Page title', '', 'eager', '100vw' %}
  </div>
  <div class="page-banner__container">
    <h1 class="page-banner__title">Page Title</h1>
  </div>
</section>
```

---

## 3. Content Block

**Main HTML:** `<section class="content-block">`

**Modifiers:**
- `content-block--reversed` — flips layout so image is on the right, text on the left (desktop)
- `content-block--brands` — switches to a stacked column layout for brand logo grids

**Description:** The primary two-column section. Left: stacked image treatment (primary large + secondary overlapping smaller). Right: text content. Stacks to single column on mobile. The most-used layout pattern across the site.

**Content Slots:**
- `content-block__topper` — small all-caps eyebrow label (primary color)
- `content-block__title` — H2
- `content-block__text` — body paragraph(s); repeat for multiple paragraphs
- `content-block__media` — image column wrapper
  - `content-block__picture content-block__picture--primary` — large image
  - `content-block__picture content-block__picture--secondary` — small overlapping accent image
- `content-block__quote` *(optional)* — testimonial callout box inside the text column
  - `content-block__quote-text`, `content-block__quote-name`, `content-block__quote-job`, `content-block__quote-icon`
- `content-block__list` / `content-block__item` *(optional)* — icon+title+text list items
  - `content-block__item-title`, `content-block__item-text`
- `content-block__stats` / `content-block__stat` *(optional)* — stat number + label pairs
  - `content-block__stat-number`, `content-block__stat-label`
- `content-block__button` — button wrapper (use `btn btn--solid` inside)
- `content-block__brands` / `content-block__brand` *(optional, with `--brands` modifier)* — brand logo grid

**Example skeleton:**
```html
<section class="content-block">
  <div class="content-block__container">
    <div class="content-block__media">
      <picture class="content-block__picture content-block__picture--primary">
        {% image './src/assets/images/photo.jpg', 'Alt text', '', 'lazy', '...' %}
      </picture>
      <picture class="content-block__picture content-block__picture--secondary">
        {% image './src/assets/images/photo2.jpg', 'Alt text', '', 'lazy', '...' %}
      </picture>
    </div>
    <div class="content-block__content">
      <span class="content-block__topper">Eyebrow</span>
      <h2 class="content-block__title">Section Headline</h2>
      <p class="content-block__text">Body copy.</p>
      <div class="content-block__button">
        <a href="/contact" class="btn btn--solid">Learn More</a>
      </div>
    </div>
  </div>
</section>
```

---

## 4. Services

**Main HTML:** `<section class="services">`

**Modifiers:**
- `services--overlap` — card overlaps the hero section above it (negative top margin, top border accent, shadow). Used on homepage only.

**Description:** A section with an optional header (topper + title + text) and a responsive card grid of service/feature items. Each item has an icon (SVG in a circle), title, and description. Grid is 1-col mobile → 2-col tablet → 3-col desktop.

**Content Slots:**
- `services__header` — wraps topper + title + text
  - `services__topper`, `services__title`, `services__text`
- `services__grid` — the card grid wrapper
- `services__item` — individual card
  - `services__icon` — circular icon container with `<img>` inside
  - `services__item-title` — card heading
  - `services__item-text` — card description

**Example skeleton:**
```html
<section class="services services--overlap">
  <div class="services__container">
    <div class="services__header">
      <span class="services__topper">What We Offer</span>
      <h2 class="services__title">Our Services</h2>
      <p class="services__text">Intro copy.</p>
    </div>
    <ul class="services__grid">
      <li class="services__item">
        <div class="services__icon"><img src="/assets/svgs/service1.svg" alt=""></div>
        <h3 class="services__item-title">Service Name</h3>
        <p class="services__item-text">Description.</p>
      </li>
    </ul>
  </div>
</section>
```

---

## 5. Reviews

**Main HTML:** `<section class="reviews">`

**Modifiers:** None

**Description:** Social proof section. Centered header + responsive grid of testimonial cards. Each card has an avatar image (floated above the card top edge), a quote, reviewer name, role, and star rating. Grid is 1-col → 2-col → 3-col.

**Content Slots:**
- `reviews__topper`, `reviews__title`, `reviews__text` — section header
- `reviews__grid` — `<ul>` wrapper
- `reviews__item` — individual `<li>` card
  - `reviews__avatar` — profile picture
  - `reviews__quote` — testimonial text (separated by border-bottom)
  - `reviews__reviewer` — reviewer name
  - `reviews__role` — reviewer job title
  - `reviews__stars` — star rating SVG
- `reviews__button` — CTA below the grid

---

## 6. Call To Action (CTA)

**Main HTML:** `<section class="cta">`

**Modifiers:**
- `cta--dark` — heavier overlay (0.8 opacity)
- `cta--light` — light overlay; title/text switch to dark color
- `cta--no-overlay` — removes overlay entirely

**Description:** Full-bleed image section with dark overlay, centered headline, optional body text, and one or more CTA buttons. Used at the bottom of most pages as a conversion section.

**Content Slots:**
- `cta__background` — background image (`{% image %}` inside)
- `cta__container` — centers content (z-index above overlay)
- `cta__title` — H2 (white)
- `cta__text` *(optional)* — body paragraph (white)
- `cta__buttons` — flex container for buttons
- `cta__button` *(alternative)* — single button wrapper

**Example skeleton:**
```html
<section class="cta">
  <div class="cta__background">
    {% image './src/assets/images/photo.jpg', 'Alt', '', 'lazy', '100vw' %}
  </div>
  <div class="cta__container">
    <h2 class="cta__title">Ready to get started?</h2>
    <p class="cta__text">Optional supporting copy.</p>
    <div class="cta__buttons">
      <a href="/contact" class="btn btn--solid">Schedule a Consultation</a>
    </div>
  </div>
</section>
```

---

## 7. Buttons

**Base class:** `<a class="btn">` or `<button class="btn">`

**Variants (always add alongside `btn`):**

| Class | Description |
|---|---|
| `btn--solid` | Primary filled button (primary color bg → dark bg on hover) |
| `btn--secondary` | Outline button (primary color border, transparent bg) |
| `btn--hero-solid` | Larger solid variant for use inside `.hero__buttons` only |
| `btn--hero-transparent` | Outline/transparent variant for use inside `.hero__buttons` only |

**Size modifiers:**
| Class | Description |
|---|---|
| `btn--small` | Smaller padding/height |
| `btn--large` | Larger padding/height |

**Icon modifier:** `btn--icon` — adds `display:flex` + animated icon offset on hover. Add `<span class="btn__icon">` inside.

---

## 8. Contact Form

**Main HTML:** `<section class="contact-form">` (or as a `<div>` wrapper)

**Modifiers:** None

**Description:** Two-panel contact layout. Left: labelled form with name/email/phone/message inputs and a submit button. Right: image with overlaid contact info (phone, email, address) or a map-style photo block. Stacks vertically on mobile.

**Content Slots (Form side):**
- `contact-form__form` — the `<form>` element
- `contact-form__content` — optional intro (topper + title + text)
- `contact-form__label` — wraps each field with hidden label text
- `contact-form__input` — text/email/phone `<input>`
- `contact-form__textarea contact-form__label-message` — `<textarea>`
- `contact-form__button` — submit button (full width)

**Content Slots (Info side):**
- `contact-form__info` — right panel wrapper
- `contact-form__background` — image block with overlay
- `contact-form__info-overlay` — positioned over background image
- `contact-form__info-group` — one info item (phone / email / address)
  - `contact-form__info-header` — label ("Phone", "Email")
  - `contact-form__info-link` / `contact-form__info-block` — the actual value

---

## 9. Contact Info

**Main HTML:** `<div class="contact-info">`

**Modifiers:** None

**Description:** Dark-background sidebar/panel showing contact details. Used on the contact page alongside the form or as a standalone block. Contains sections with titles and grouped links.

**Content Slots:**
- `contact-info__section` — a card (dark bg, rounded)
  - `contact-info__title` — section label ("Get In Touch", "Hours")
  - `contact-info__content` — padding wrapper
  - `contact-info__group` — one contact entry
    - `contact-info__header` — field label (e.g. "Phone")
    - `contact-info__link` — `<a>` for phone/email
    - `contact-info__block` — plain text line (for address lines)

---

## 10. Article Card

**Main HTML:** `<article class="article-card">`

**Modifiers:**
- `article-card--single` — full-width single post layout (no card border, larger image, rich body typography)

**Description:** Blog post preview card. Image on top, content below. Shows author avatar + name + date in meta row, then title, excerpt, and "Read More" button. Used in the blog listing grid.

**Content Slots:**
- `article-card__image-wrapper` — image container
- `article-card__content` — text content area
- `article-card__meta` — author image + name + dot + date
- `article-card__title` — post title (turns primary color on hover)
- `article-card__excerpt` — post excerpt text
- `article-card__link` — "Read More" button-style link
- `article-card__body` *(single variant)* — full post HTML content (styled h1-h6, p, ul, blockquote, code, pre)

---

## 11. Gallery

**Main HTML:** `<section class="gallery">`

**Modifiers:**
- `gallery--home` — compact variant with tighter spacing, used on homepage
- `gallery--masonry` — activates Masonry.js absolute positioning

**Grid modifier:** `gallery__grid--masonry` — on the inner grid element, activates Masonry.js layout

**Description:** Photo gallery with optional header and a responsive CSS columns grid. Supports hover zoom + overlay. Integrates with PhotoSwipe lightbox via `.pswp-gallery` wrapper.

**Content Slots:**
- `gallery__header` — optional topper + title + text
- `gallery__grid` — the `<ul>` or `<div>` column grid
- `gallery__item` — individual image item (add `data-pswp-src` for lightbox)
  - `<img>` inside for the photo
- `gallery__button` — CTA below grid

---

## 12. Blog Layout

**Main HTML:** `<section class="blog-layout">`

**Description:** Two-column layout for blog listing and single post pages. Main content left, sidebar right. Stacks on mobile. See `_blog-layout.scss` for breakpoints.

**Content Slots:**
- `blog-layout__main` — primary content column (article cards or single post)
- `blog-layout__sidebar` — secondary column (`sidebar` component)

---

## 13. Sidebar

**Main HTML:** `<aside class="sidebar">`

**Modifiers:** None

**Description:** Blog sidebar with dark-background sections. Used for featured posts, contact info, and hours. Each section is a rounded dark card.

**Content Slots:**
- `sidebar__section` — dark card wrapper
- `sidebar__title` — section heading
- `sidebar__featured-list` — `<ul>` of post preview links
  - `sidebar__featured-item` — `<a>` wrapping image + content
    - `sidebar__featured-image` — thumbnail
    - `sidebar__featured-title`, `sidebar__featured-date`
- **Contact variant slots:** `sidebar__group`, `sidebar__header`, `sidebar__link`, `sidebar__block`, `sidebar__hours`, `sidebar__hour`

---

## 14. Pagination

**Main HTML:** `<nav class="pagination">`

**Modifiers:** None

**Description:** Numbered page navigation for blog listing. Shows Previous / numbered pages / Next. Current page highlighted in primary color.

**Content Slots:**
- `pagination__list` — `<ul>` wrapper
- `pagination__item` — `<li>`; add `pagination__item--prev` / `pagination__item--next` for arrow items
- `pagination__link` — `<a>`; add `pagination__link--current` for active page; `pagination__link--prev` / `pagination__link--next` for arrows
- `pagination__arrow` — arrow character inside prev/next links

---

## 15. Navigation

**Main HTML:** `<nav class="navigation">`

**Modifiers:**
- `navigation--scrolled` — applied by JS on scroll; triggers solid background

**Description:** Fixed top navigation bar. Transparent on load, transitions to solid white on scroll. Contains logo, nav links (with dropdown support), and optional social icons. Mobile: hamburger → full-screen overlay menu.

**Key sub-elements:**
- `navigation__logo` — `<a>` with logo `<img>` inside
  - Uses `logo-color.png` by default; swap to `logo-light.png` for light variant
- `navigation__menu` — `<ul>` of nav links
- `navigation__item` — `<li>`; add `navigation__item--has-dropdown` for parent items
- `navigation__link` — `<a>` for each nav item
- `navigation__dropdown` — `<ul>` sub-menu; add `navigation__dropdown--open` class via JS to show on mobile tap
- `navigation__background` — transparent-to-solid background layer (CSS animated)
- `navigation__hamburger` — mobile toggle button

---

## 16. Footer

**Main HTML:** `<footer class="footer">`

**Modifiers:** None

**Description:** Light grey footer. Top row: logo left + nav links right. Bottom row: address/email left + copyright right.

**Content Slots:**
- `footer__logo` — logo image link
- `footer__nav` — `<ul>` of footer links
- `footer__address` — physical address text
- `footer__copyright` — copyright line

---

## Global Layout Utilities

### Container
Applied via SCSS mixin `mix.container(max-width)`. Default max-width: `80rem`. Used inside every section as `__container`.

### Section Padding
All sections use `vars.$section-padding` = `clamp(3.75rem, 7.82vw, 6.25rem) 1rem` by default.

### Animation
Scroll-triggered entrance animations are applied globally via `src/assets/js/main.js` using Intersection Observer. Elements with `data-animate` get `opacity:0 → 1` + `translateY` on enter. Do not add custom animation CSS — rely on the existing JS observer.

---

## Component Quick Reference

| Component | Root Class | Key Modifier(s) |
|---|---|---|
| Hero | `.hero` | `--parallax`, `--minimal` |
| Page Banner | `.page-banner` | — |
| Content Block | `.content-block` | `--reversed`, `--brands` |
| Services | `.services` | `--overlap` |
| Reviews | `.reviews` | — |
| CTA | `.cta` | `--dark`, `--light`, `--no-overlay` |
| Contact Form | `.contact-form` | — |
| Contact Info | `.contact-info` | — |
| Article Card | `.article-card` | `--single` |
| Gallery | `.gallery` | `--home`, `--masonry` |
| Blog Layout | `.blog-layout` | — |
| Sidebar | `.sidebar` | — |
| Pagination | `.pagination` | — |
| Navigation | `.navigation` | `--scrolled` |
| Footer | `.footer` | — |
| Button | `.btn` | `--solid`, `--secondary`, `--hero-solid`, `--hero-transparent`, `--small`, `--large`, `--icon` |
