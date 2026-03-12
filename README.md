# TTA Upconversion Research Tracker

A curated, automatically-updated website tracking cutting-edge research on Triplet-Triplet Annihilation (TTA) photon upconversion.

🌐 **Live Site:** https://tta-uc-tracker.pages.dev

## Overview

This is an Astro-based static site that catalogs recent papers on TTA upconversion with daily discussion articles analyzing trends and breakthroughs in the field.

### Features

- **Paper Catalog:** 14+ papers with detailed summaries, significance notes, and tags
- **Daily Discussion Articles:** Expert analysis connecting papers to broader trends
- **Search & Filter:** Client-side search and category filtering
- **Dark Theme:** GitHub-inspired dark UI optimized for readability
- **Auto-Deploy:** Push to GitHub → automatic deployment via Cloudflare Pages

## Quick Start

### For Developers

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### For AI Agents

See **[AGENT-GUIDE.md](./AGENT-GUIDE.md)** for detailed instructions on updating the catalog and creating articles.

**TL;DR:**
1. Edit `src/data/catalog.json` to add papers
2. Create `src/content/articles/YYYY-MM-DD.md` for daily discussions
3. `git add . && git commit -m "Update" && git push`
4. Site auto-deploys in 2-3 minutes

## Project Structure

```
site/
├── src/
│   ├── data/
│   │   └── catalog.json          # Paper catalog (append new entries)
│   ├── content/
│   │   ├── articles/             # Daily discussion articles
│   │   └── config.ts             # Content collections config
│   ├── pages/
│   │   └── index.astro           # Main page
│   └── content.config.ts         # Astro v6 content config
├── public/                       # Static assets
├── dist/                         # Build output (auto-generated)
├── AGENT-GUIDE.md               # Guide for AI agents updating content
├── DEPLOYMENT-SETUP.md          # Cloudflare Pages setup instructions
└── package.json
```

## Content Updates

### Adding Papers

Edit `src/data/catalog.json` and append a new entry:

```json
{
  "id": "author_year_journal_topic",
  "title": "Paper Title",
  "authors": ["Author One", "Author Two"],
  "journal": "Journal Name",
  "date": "YYYY-MM-DD",
  "url": "https://...",
  "category": "fundamental-mechanism",
  "significance": "high",
  "abstract_summary": "What the paper does...",
  "significance_notes": "Why it matters...",
  "tags": ["tag1", "tag2"]
}
```

### Creating Articles

Create `src/content/articles/YYYY-MM-DD.md`:

```markdown
---
title: "TTA-UC Discussion Section - Month Day, Year"
date: "YYYY-MM-DD"
edition: "Optional subtitle"
---

## Field Pulse

Your analysis here...
```

## Deployment

### Automatic (GitHub)

1. Make changes
2. `git push origin main`
3. Cloudflare Pages auto-builds and deploys
4. Live in 2-3 minutes

See [DEPLOYMENT-SETUP.md](./DEPLOYMENT-SETUP.md) for connecting GitHub if not already set up.

### Manual (Wrangler)

```bash
npm run build
export CLOUDFLARE_ACCOUNT_ID=4a7e4f3a80ddd432ad372a6a8597f14f
wrangler pages deploy dist --project-name=tta-uc-tracker
```

## Tech Stack

- **Framework:** Astro 5.x (static site generator)
- **Content:** Content Collections (articles) + JSON (catalog)
- **Styling:** Vanilla CSS with GitHub-inspired dark theme
- **Hosting:** Cloudflare Pages
- **Repo:** https://github.com/chadeth/tta-uc-tracker

## Design Principles

1. **Agent-First:** Content updates should be trivial for AI agents
2. **No Database:** Static JSON + markdown files
3. **Auto-Deploy:** Push to GitHub = live site
4. **Simple:** Minimal dependencies, pure Astro + CSS
5. **Fast:** Static generation, client-side filtering

## Rules

- **NO EM-DASHES:** Use hyphens (-) or commas instead
- **Valid JSON:** Always check `catalog.json` syntax
- **Frontmatter Required:** Articles need title, date in YAML frontmatter
- **Semantic HTML:** Proper heading hierarchy, accessible markup

## Contributing

This site is designed for automated updates by AI agents. Manual edits are welcome but should follow the structure in AGENT-GUIDE.md.

For design changes or new features, edit `src/pages/index.astro` and test locally before pushing.

## License

Content is curated research summaries (fair use for educational purposes).
Code is open source - do what you want with it.

## Contact

Maintained by Rafi via AI agent "Chadeth"
Repo: https://github.com/chadeth/tta-uc-tracker
