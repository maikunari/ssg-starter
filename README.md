# SSG-Starter - Modern Eleventy Business Website Template

A production-ready static site generator template for business websites with 7 pre-built themes, interactive setup wizard, and client-friendly CMS.

[![Eleventy](https://img.shields.io/badge/Eleventy-3.x-blue)](https://11ty.dev/)
[![Node](https://img.shields.io/badge/Node-18+-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE.md)

## Quick Start

Get a new site running in under 5 minutes:

```bash
# 1. Use this template (click "Use this template" button on GitHub)
#    OR clone directly:
git clone https://github.com/YOUR-USERNAME/ssg-starter.git my-site
cd my-site

# 2. Install dependencies
npm install

# 3. Run interactive setup wizard
npm run setup

# 4. Start development
npm start
```

Visit `http://localhost:8080` to see your site!

## Features at a Glance

- **🎨 7 Professional Themes** - Switch with a single variable
- **🚀 Interactive Setup Wizard** - Configure your site in minutes
- **📝 Decap CMS** - Client-friendly blog management
- **✨ GSAP Animations** - Smooth scroll animations
- **🖼️ Image Optimization** - Auto AVIF/WebP/JPEG generation
- **📱 Fully Responsive** - Mobile-first design
- **🎭 PhotoSwipe Galleries** - Lightbox with Masonry layouts
- **⚡ Performance First** - Critical CSS, lazy loading, minification
- **🔒 Security Headers** - Pre-configured via Netlify

## What's Included

### Pre-Built Pages
- Homepage with hero, services, CTA
- About page
- Services page
- Contact page with form
- Gallery with PhotoSwipe lightbox
- Blog with pagination
- Reviews/testimonials page
- Privacy policy & terms pages

### 7 Professionally Designed Themes

| Theme | Best For |
|-------|----------|
| **Artisan** (default) | Home services, crafts, traditional businesses |
| **Modern** | Tech, consulting, startups |
| **Elegant** | Professional services, luxury goods |
| **Rustic** | Outdoor, eco-friendly, natural products |
| **Vibrant** | Creative agencies, youth-oriented |
| **Minimalist** | Modern brands, clean aesthetic |
| **Luxury** | High-end services, premium brands |

Switch themes by changing one variable in `src/assets/css/abstracts/_schemes.scss`!

### Tech Stack

- **Eleventy 3.x** - Fast, flexible static site generator
- **Sass** - Modular CSS with 7-1 architecture
- **GSAP** - Professional-grade animations
- **Decap CMS** - Git-based content management
- **esbuild** - Lightning-fast JavaScript bundling
- **PostCSS** - Automatic vendor prefixing
- **Eleventy Image** - Responsive image optimization

## Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Complete setup walkthrough
- **[CLAUDE.md](./CLAUDE.md)** - Detailed architecture & development guide
- **[Deployment Guide](./QUICK_START.md#deployment)** - Netlify deployment instructions

## Interactive Setup Wizard

The setup wizard (`npm run setup`) guides you through:

1. **Business Information** - Name, email, phone, address
2. **Business Details** - Services, hours, team size
3. **Author Profiles** - Names, titles, bios
4. **Theme Selection** - Choose from 7 themes with descriptions
5. **Repository Settings** - Git URL, branch configuration

All configuration files are automatically updated!

## Commands

```bash
# Development
npm start                # Full dev environment with live reload
npm run build            # Production build

# Individual Build Steps
npm run build:scss       # Compile Sass + Autoprefixer
npm run build:eleventy   # Build Eleventy site
npm run build:assets     # Bundle JavaScript
npm run build:blog-images # Process blog images

# Utilities
npm run clean            # Remove build output
npm run start:proxy      # CMS proxy server only
npm run setup            # Run setup wizard again
```

## Using This Template

### GitHub Template (Recommended)

1. Click **"Use this template"** button (green button at top of repository)
2. Name your new repository
3. Clone your repository
4. Run `npm install`
5. Run `npm run setup`

### Manual Clone

```bash
git clone https://github.com/YOUR-USERNAME/ssg-starter.git my-project
cd my-project
rm -rf .git
git init
npm install
npm run setup
```

## After Setup

The setup wizard updates all configuration files, but you'll need to manually add:

### Required Assets

1. **Author Photos** - Add to `src/assets/images/authors/`
   - Format: JPG or PNG
   - Naming: `{author-slug}.jpg` (e.g., `john-doe.jpg`)
   - Size: 300x300px minimum (square)

2. **Logo Files** - Add to `src/assets/images/`
   - `logo-light.png` - For dark backgrounds
   - `logo-color.png` - For light backgrounds

3. **Favicons** - Update in `src/assets/favicons/`
   - Use [RealFaviconGenerator](https://realfavicongenerator.net/)

4. **Social Image** - Add to `src/assets/images/`
   - `social.jpg` - 1200x630px for social sharing

See [Quick Start Guide](./QUICK_START.md#manual-asset-setup) for detailed specifications.

## Project Structure

```
ssg-starter/
├── src/
│   ├── _data/              # Global data (client info, authors)
│   ├── _includes/          # Reusable components
│   ├── _layouts/           # Page layouts
│   ├── admin/              # Decap CMS configuration
│   ├── assets/
│   │   ├── css/            # SCSS (7-1 architecture)
│   │   ├── js/             # JavaScript source
│   │   ├── fonts/          # Self-hosted fonts
│   │   └── images/         # Images and assets
│   ├── blog/               # Blog posts (Markdown)
│   ├── pages/              # Site pages
│   └── index.html          # Homepage
├── public/                 # Build output (generated)
├── setup-site.js           # Interactive setup wizard
├── .eleventy.js           # Eleventy configuration
├── package.json           # Dependencies & scripts
└── netlify.toml           # Deployment configuration
```

## Theme System

All colors use a centralized theme system. Components automatically adapt when you switch themes.

### Switching Themes

Edit `src/assets/css/abstracts/_schemes.scss`:

```scss
// Change this variable to switch themes
$active-scheme: modern;  // artisan, modern, elegant, rustic, vibrant, minimalist, luxury
```

Rebuild CSS:

```bash
npm run build:scss
```

### Theme-Aware Development

Always use the `schemes.color()` function:

```scss
@use '../abstracts/schemes' as schemes;

.component {
  background-color: schemes.color(primary);
  color: schemes.color(body-text-color);
}
```

Never hardcode colors! See [CLAUDE.md](./CLAUDE.md#theme-system-architecture) for details.

## Decap CMS

Manage blog content through a visual interface at `http://localhost:8080/admin`

### Local Development

```bash
npm start  # Starts CMS proxy server automatically
```

Navigate to `http://localhost:8080/admin` to access the CMS.

### Production Setup

1. Deploy to Netlify
2. Enable Netlify Identity
3. Enable Git Gateway
4. Invite users via Identity tab

See [Quick Start Guide - Deployment](./QUICK_START.md#deployment) for full instructions.

## Deployment

### Netlify (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial site setup"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Import repository
   - Build settings auto-detected from `netlify.toml`
   - Deploy!

3. **Enable CMS**:
   - Enable Netlify Identity
   - Enable Git Gateway
   - Invite users

All build settings are pre-configured in `netlify.toml`.

### Other Platforms

Works with any static hosting:

- **Vercel** - Auto-detected
- **Cloudflare Pages** - Build: `npm run build`, Output: `public`
- **GitHub Pages** - Requires workflow file
- **AWS S3** - Upload `public/` folder

## Performance

Out of the box, SSG-Starter achieves:

- **Lighthouse Performance**: 95-100
- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: 0
- **Total Blocking Time**: < 200ms

Optimizations included:

- Critical CSS inlining
- HTML minification
- Image optimization (AVIF/WebP)
- Font preloading
- Security headers
- Cache headers

## Browser Support

Targets last 2 years of browsers via `browserslist`:

```json
"browserslist": [
  "last 2 years",
  "> 0.5%",
  "not dead"
]
```

Includes autoprefixer for CSS vendor prefixes.

## Customization

### Adding Pages

Create new files in `src/pages/`:

```html
---
title: My New Page
layout: 'base.html'
description: Page description for SEO
---

<section class="page-banner">
  <h1>{{ title }}</h1>
</section>

<!-- Your content -->
```

### Creating Components

Add to `src/assets/css/components/`:

```scss
@use '../abstracts/schemes' as schemes;
@use '../abstracts/variables' as vars;

.my-component {
  background: schemes.color(medium);
  color: schemes.color(body-text-color-white);

  &__element {
    color: schemes.color(primary);
  }
}
```

Import in `src/assets/css/main.scss`.

### Adding Scroll Animations

```html
<!-- Single element -->
<div data-animate="fade-up">Animates on scroll</div>

<!-- Group animation (standard) -->
<div data-animate-group>
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Group animation (fast) -->
<div data-animate-group data-animate-fast>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Troubleshooting

### Common Issues

**Setup script not working**
- Ensure you're in the project root
- Run `npm install` first
- Check Node version: `node --version` (need 18+)

**Sass compilation errors**
- Check for syntax errors
- Ensure all `@use` statements are at top of file
- Verify color functions use `schemes.color()`

**CMS not loading**
- Ensure `npm start` is running
- Check `local_backend: true` in `src/admin/config.yml`
- Clear browser cache

**Images not loading**
- Check file paths start with `/`
- Verify images exist in correct directories
- Ensure filenames match exactly (case-sensitive)

See [Quick Start Guide - Troubleshooting](./QUICK_START.md#troubleshooting) for more solutions.

## Examples & Demos

- **Live Demo**: [Coming Soon]
- **Starter Templates**: Check the `/examples` folder (if available)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

- **Documentation**: [CLAUDE.md](./CLAUDE.md) for architecture details
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Use GitHub Discussions for questions

## License

MIT License - see [LICENSE.md](./LICENSE.md) for details.

## Credits

Built with:
- [Eleventy](https://www.11ty.dev/) by Zach Leatherman
- [GSAP](https://gsap.com/) by GreenSock
- [Decap CMS](https://decapcms.org/) (formerly Netlify CMS)
- [PhotoSwipe](https://photoswipe.com/) by Dmytro Semenov

---

**Ready to build your site?** Start with the [Quick Start Guide](./QUICK_START.md)!
