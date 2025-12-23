# SSG-Starter Quick Start Guide

Welcome to SSG-Starter! This guide will help you create a new business website in under 15 minutes.

## Table of Contents

- [What is SSG-Starter?](#what-is-ssg-starter)
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Automated Configuration](#automated-configuration)
- [Manual Asset Setup](#manual-asset-setup)
- [Theme Customization](#theme-customization)
- [Content Creation](#content-creation)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Post-Launch](#post-launch)
- [Troubleshooting](#troubleshooting)

## What is SSG-Starter?

SSG-Starter is a production-ready Eleventy static site generator template designed for business websites. It includes:

### Features

- **🎨 7 Pre-built Themes** - Switch themes with a single variable change
- **📝 Decap CMS Integration** - Client-friendly content management
- **✨ GSAP Scroll Animations** - Smooth, performant animations
- **🖼️ Image Optimization** - Automatic AVIF/WebP/JPEG generation
- **📱 Fully Responsive** - Mobile-first design
- **🎭 PhotoSwipe Galleries** - Lightbox image galleries with Masonry layouts
- **🚀 View Transitions API** - Native browser page transitions
- **⚡ Performance Optimized** - Critical CSS, lazy loading, minification

### Tech Stack

- **Eleventy 3.x** - Static site generator
- **Sass** - CSS preprocessing with 7-1 architecture
- **PostCSS/Autoprefixer** - CSS vendor prefixing
- **esbuild** - Fast JavaScript bundling
- **GSAP** - Professional-grade animations
- **Decap CMS** - Git-based content management
- **Netlify** - Recommended deployment platform

## Prerequisites

Before you begin, ensure you have:

- **Node.js** version 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- A code editor (VS Code, Sublime Text, etc.)
- A GitHub or GitLab account (for deployment)

### Check Your Versions

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
git --version   # Should be 2.0.0 or higher
```

## Initial Setup

### Option 1: Use as GitHub Template (Recommended)

1. Go to the SSG-Starter repository on GitHub
2. Click the **"Use this template"** button (green button near the top)
3. Choose a name for your repository
4. Click **"Create repository from template"**
5. Clone your new repository:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

### Option 2: Clone Directly

```bash
git clone https://github.com/YOUR-USERNAME/ssg-starter.git my-site
cd my-site
rm -rf .git
git init
```

### Install Dependencies

```bash
npm install
```

This may take 2-3 minutes as it installs all required packages.

## Automated Configuration

SSG-Starter includes an interactive setup wizard that configures your site automatically.

### Run the Setup Wizard

```bash
npm run setup
```

The wizard will ask you about:

### 1. Business Information
- Business name
- Email address
- Phone number
- Emergency phone (optional)

### 2. Business Address
- Street address
- Suite/apartment (optional)
- City
- State/County
- ZIP/postal code

A Google Maps link will be generated automatically.

### 3. Business Details
- Website domain
- Year established
- Team size

### 4. Services
Enter your services one at a time (minimum 3):
- Service 1: _Enter service name_
- Service 2: _Enter service name_
- Press Enter on empty input when done

### 5. Business Hours
Choose between:
- **Template hours** (Mon-Fri 9-5, Sat 10-3, Sun Closed)
- **Custom hours** (enter each day individually)

### 6. Author Profiles
For each author:
- Full name
- Professional title
- Bio/description

Add multiple authors if needed.

### 7. Theme Selection
Choose from 7 pre-built themes:
- **Artisan** (default) - Warm golden with blue-gray accents
- **Modern** - Tech-inspired blue palette
- **Elegant** - Sophisticated brown tones
- **Rustic** - Earthy green colors
- **Vibrant** - Energetic red and blue
- **Minimalist** - Clean neutral palette
- **Luxury** - Dark premium aesthetic

### 8. Repository Settings
- Git repository URL
- Default branch (main/master)
- Netlify deployment preference

### What Gets Updated

The setup script automatically updates:

- ✅ `src/_data/client.json` - All business information
- ✅ `src/_data/authors.json` - Author profiles
- ✅ `src/assets/css/abstracts/_schemes.scss` - Active theme
- ✅ `src/admin/config.yml` - CMS configuration
- ✅ `package.json` - Repository metadata

## Manual Asset Setup

After running the setup wizard, you need to add these assets manually:

### 1. Author Photos

Add photos for each author to `src/assets/images/authors/`:

```
src/assets/images/authors/
├── john-doe.jpg
├── jane-smith.jpg
└── ...
```

**Specifications:**
- Format: JPG or PNG
- Size: Minimum 300x300px (square recommended)
- Naming: Match the author slug (generated from name)

### 2. Logo Files

Add your logo files to `src/assets/images/`:

```
src/assets/images/
├── logo-light.png    # For dark backgrounds (header)
└── logo-color.png    # For light backgrounds (CMS)
```

**Specifications:**
- Format: PNG with transparency
- Size: Width ~200-300px
- Both versions required

### 3. Favicons

Update favicons in `src/assets/favicons/`:

```
src/assets/favicons/
├── favicon.ico
├── apple-touch-icon.png
├── favicon-16x16.png
├── favicon-32x32.png
└── site.webmanifest
```

**Recommended Tool:** [RealFaviconGenerator](https://realfavicongenerator.net/)

1. Upload your logo
2. Configure settings
3. Download favicon package
4. Replace files in `src/assets/favicons/`

### 4. Social Sharing Image

Add a social media preview image:

```
src/assets/images/social.jpg
```

**Specifications:**
- Format: JPG or PNG
- Size: 1200x630px (Facebook/Twitter standard)
- Shows when sharing your site on social media

## Theme Customization

### Switching Themes

To change your theme after initial setup:

1. Open `src/assets/css/abstracts/_schemes.scss`
2. Change the `$active-scheme` variable:

```scss
$active-scheme: modern; // Change to any theme name
```

3. Rebuild your CSS:

```bash
npm run build:scss
```

### Available Themes

| Theme | Primary Color | Best For |
|-------|--------------|----------|
| `artisan` | Warm gold | Crafts, home services |
| `modern` | Tech blue | Technology, consulting |
| `elegant` | Sophisticated brown | Professional services |
| `rustic` | Earthy green | Outdoor, eco-friendly |
| `vibrant` | Energetic red/blue | Creative, youth-oriented |
| `minimalist` | Neutral gray | Modern, clean design |
| `luxury` | Dark premium | High-end services |

### Creating Custom Themes

See [CLAUDE.md](./CLAUDE.md#theme-system-architecture) for detailed instructions on creating your own theme.

## Content Creation

### Homepage

Edit `src/index.html` to customize:
- Hero section
- Services overview
- Call-to-action sections
- Featured content

### Additional Pages

All pages are in `src/pages/`:

```
src/pages/
├── about.html
├── services.html
├── contact.html
├── gallery.html
├── blog.html
├── reviews.html
├── privacy.html
└── terms.html
```

### Navigation Setup

Pages use the `@11ty/eleventy-navigation` plugin. Add to frontmatter:

```yaml
---
eleventyNavigation:
  key: Page Name
  order: 1
---
```

### Writing Blog Posts

#### Via Decap CMS (Recommended for Clients)

1. Start the CMS proxy server:
```bash
npm run start:proxy
```

2. Navigate to `http://localhost:8080/admin`
3. Click "New Post"
4. Fill in all fields
5. Upload featured image
6. Save and publish

#### Manually (Markdown Files)

Create a file in `src/blog/`:

```markdown
---
pageName: my-first-post
postTitle: My First Blog Post
seoTitle: My First Blog Post | Business Name
excerpt: A brief summary of the post...
author: john-doe
date: 2025-01-15
tags:
  - post
  - featured  # Optional: shows in sidebar
image: /images/blog/my-first-post.jpg
imageAlt: Description of image
---

Your blog post content in Markdown format...
```

## Local Development

### Start Development Server

```bash
npm start
```

This starts:
- ✅ Eleventy dev server (port 8080)
- ✅ Sass compiler (watches for changes)
- ✅ JavaScript bundler (watches for changes)
- ✅ Decap CMS proxy server

### Available Commands

```bash
npm start              # Full dev environment with live reload
npm run build          # Production build
npm run start:eleventy # Eleventy server only
npm run start:proxy    # CMS proxy server only
npm run watch:scss     # Watch Sass files
npm run watch:js       # Watch JavaScript files
npm run clean          # Remove build output
```

### Access Your Site

- **Main site:** http://localhost:8080
- **CMS:** http://localhost:8080/admin

Live reload is enabled - changes appear automatically!

## Deployment

### Netlify Deployment (Recommended)

#### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial site setup"
git push origin main
```

#### Step 2: Connect to Netlify

1. Log in to [Netlify](https://netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and select your repository
4. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `public`
   - Node version: 20
5. Click **"Deploy site"**

#### Step 3: Enable Netlify Identity

1. In Netlify dashboard, go to **Site settings** → **Identity**
2. Click **"Enable Identity"**
3. Under **Registration**, choose **"Invite only"**
4. Under **External providers**, enable **GitHub** or **GitLab**

#### Step 4: Enable Git Gateway

1. Still in Identity settings
2. Scroll to **Services** → **Git Gateway**
3. Click **"Enable Git Gateway"**

#### Step 5: Invite CMS Users

1. Go to **Identity** tab in Netlify dashboard
2. Click **"Invite users"**
3. Enter email addresses
4. Users will receive invitation emails

#### Step 6: Custom Domain (Optional)

1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Follow DNS configuration instructions

### Other Hosting Platforms

SSG-Starter works with any static hosting:

- **Vercel:** Import from GitHub, auto-detected
- **Cloudflare Pages:** Build command `npm run build`, output `public`
- **GitHub Pages:** Requires workflow file
- **AWS S3:** Upload `public/` folder

## Post-Launch

### CMS Access for Clients

Send clients to `https://yourdomain.com/admin`:

1. They'll see Netlify Identity login
2. First time: Click invitation link from email
3. Set password
4. Access CMS dashboard

### Content Management Workflow

1. **Create Post:** Click "New Post" in CMS
2. **Edit Post:** Click post in list
3. **Upload Images:** Drag and drop in image field
4. **Save Draft:** Click "Save" (not published)
5. **Publish:** Click "Publish" → "Publish now"
6. **Changes:** Trigger Netlify rebuild automatically

### Performance Monitoring

- Use [PageSpeed Insights](https://pagespeed.web.dev/)
- Target: 90+ score on all metrics
- Monitor Core Web Vitals

### Security Headers

Security headers are configured in `netlify.toml`:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy

## Troubleshooting

### Setup Script Issues

**Error: "Prompt could not be rendered"**
- Ensure you're running in an interactive terminal
- Don't pipe output or run in CI environment

**Error: "File not found"**
- Run `npm run setup` from project root directory
- Ensure all files copied correctly from template

### Build Errors

**Sass Compilation Error**
- Check for syntax errors in `.scss` files
- Ensure `@use` statements are at top of file

**Eleventy Build Error**
- Check frontmatter syntax in Markdown files
- Ensure all required fields present
- Check template syntax in HTML files

**JavaScript Bundle Error**
- Check for syntax errors in `.js` files
- Ensure all imports/exports correct

### CMS Authentication Problems

**Can't Access Admin**
- Ensure Netlify Identity enabled
- Check `src/admin/config.yml` backend settings
- For local: Run `npm run start:proxy`

**Git Gateway Issues**
- Verify Git Gateway enabled in Netlify
- Check GitHub/GitLab app authorization
- Ensure user has repository access

### Image Loading Issues

**Gallery images not loading after navigation**
- Gallery images should use `loading="eager"`
- Check View Transitions re-initialization in `main.js`

**Broken image paths**
- Verify images exist in correct directories
- Check path starts with `/` for root-relative
- Ensure image filenames match exactly (case-sensitive)

### Performance Issues

**Slow build times**
- Clear `public/` folder: `npm run clean`
- Check for large images (>2MB)
- Optimize images before adding

**Slow page load**
- Run production build: `npm run build`
- Check image formats (AVIF/WebP used?)
- Verify lazy loading on images

### Getting Help

- **Documentation:** See [CLAUDE.md](./CLAUDE.md) for detailed architecture
- **Issues:** Report bugs on GitHub repository
- **Community:** Check Eleventy Discord community

## Critical Template Files

Understanding these files will help you avoid common issues:

### Blog Configuration Files

**`src/blog/blog.json`** - CRITICAL for blog functionality
```json
{
  "layout": "blog-post.html",
  "tags": "post"
}
```
This Eleventy directory data file applies the blog-post layout to ALL markdown files in the blog directory. **Without this file, blog posts will render without layout/styling.**

**Why it's needed:**
- Sets the default layout for all blog posts
- Automatically tags all posts with "post" for the collections.post array
- Enables blog posts to work without individual frontmatter layout declarations

### Blog Pagination

The blog listing page (`src/pages/blog.html`) uses Eleventy pagination:
- **With posts:** Generates blog/index.html with paginated posts
- **Empty blog:** Pagination still generates the first page so Blog link appears in navigation
- Uses `alias: posts` to make paginated items available in the template

### Template Engine Settings

**`.eleventy.js` configuration:**
```javascript
{
  htmlTemplateEngine: 'njk',  // HTML files use Nunjucks
  // markdownTemplateEngine: NOT set - uses Liquid (default)
}
```

**Why Liquid for markdown:**
- Liquid is more forgiving with special characters (like `/admin`)
- Nunjucks tries to parse certain characters as template variables
- Liquid markdown can successfully use Nunjucks layouts
- **DO NOT** set `markdownTemplateEngine: 'njk'` - it will break blog posts

### Default Content

The template includes a default "Welcome to Your New Blog" post:
- **File:** `src/blog/welcome-to-your-new-blog.md`
- **Purpose:** Shows blog functionality working immediately
- **Featured image:** `src/assets/images/blog/welcome-to-your-new-blog.jpg`
- **Action:** Users can edit or delete this post and create their own

### Placeholder Author Images

- **author-one.jpg** - Placeholder for first author
- **author-two.jpg** - Placeholder for second author
- **Location:** `src/assets/images/authors/`
- Replace these with actual author photos after setup

## Next Steps

After completing this guide:

1. ✅ Customize page content
2. ✅ Add your first blog post
3. ✅ Test all forms and functionality
4. ✅ Review theme across all pages
5. ✅ Deploy to Netlify
6. ✅ Set up custom domain
7. ✅ Test CMS with client credentials
8. ✅ Monitor performance and analytics

## Additional Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Decap CMS Documentation](https://decapcms.org/docs/)
- [GSAP Documentation](https://gsap.com/docs/)
- [Netlify Documentation](https://docs.netlify.com/)

Happy building! 🎉
