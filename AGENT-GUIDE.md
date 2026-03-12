# TTA-UC Tracker - Agent Update Guide

This guide explains how AI agents (cron jobs) should update the TTA-UC Research Tracker site.

## Overview

The site automatically deploys when you push to the `main` branch on GitHub. The workflow is:
1. Update catalog or add article
2. Commit changes
3. Push to GitHub
4. Cloudflare Pages automatically builds and deploys

## Directory Structure

```
site/
├── src/
│   ├── data/
│   │   └── catalog.json          # Paper catalog - append new entries here
│   ├── content/
│   │   └── articles/
│   │       └── YYYY-MM-DD.md     # Daily discussion articles
│   └── pages/
│       └── index.astro           # Main page (DO NOT EDIT)
├── AGENT-GUIDE.md                # This file
└── package.json
```

## Adding New Papers to the Catalog

**File:** `src/data/catalog.json`

The catalog is a JSON array. To add a new paper, append a new object to the array:

```json
{
  "id": "unique_id_author_year_journal_topic",
  "title": "Paper Title Here",
  "authors": ["Author One", "Author Two"],
  "journal": "Journal Name",
  "date": "YYYY-MM-DD",
  "doi": "10.xxxx/xxxxx",
  "url": "https://full-url-to-paper",
  "category": "fundamental-mechanism",
  "significance": "high",
  "abstract_summary": "One-paragraph summary of what the paper demonstrates and why it matters for TTA-UC.",
  "significance_notes": "Why this paper is important. What makes it notable. Practical implications.",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Required Fields
- `id` - unique identifier (lowercase, underscores, descriptive)
- `title` - full paper title
- `authors` - array of author names
- `journal` - journal name
- `date` - publication date (YYYY-MM-DD format)
- `url` - link to paper
- `category` - one of: `fundamental-mechanism`, `materials-design`, `application`, `review`, `review-perspective`, `computational`
- `abstract_summary` - concise summary
- `significance_notes` - why it matters

### Optional Fields
- `doi` - DOI string
- `significance` - one of: `medium`, `medium-high`, `high`, `very-high`
- `tags` - array of keyword tags

### Example

```json
{
  "id": "smith_2026_science_breakthrough",
  "title": "Revolutionary TTA-UC at Room Temperature",
  "authors": ["Jane Smith", "Bob Jones"],
  "journal": "Science",
  "date": "2026-03-15",
  "doi": "10.1126/science.abcd123",
  "url": "https://science.org/doi/10.1126/science.abcd123",
  "category": "fundamental-mechanism",
  "significance": "very-high",
  "abstract_summary": "First demonstration of efficient TTA-UC at room temperature without oxygen protection, using a novel MOF-based encapsulation strategy.",
  "significance_notes": "Removes the biggest practical barrier to TTA-UC commercialization. Published in Science. Likely to be widely cited.",
  "tags": ["room-temperature", "MOF", "oxygen-tolerance", "breakthrough"]
}
```

## Creating Daily Discussion Articles

**Directory:** `src/content/articles/`
**Filename:** `YYYY-MM-DD.md` (use the current date)

Each article is a markdown file with YAML frontmatter:

```markdown
---
title: "TTA-UC Discussion Section - Month Day, Year"
date: "YYYY-MM-DD"
edition: "Optional subtitle like 'Week 12' or 'Special Edition'"
---

## Your Content Here

Write in markdown. Use ## for main sections, **bold** for emphasis.

Discuss the latest papers, trends, insights.

---

*X papers cataloged. Next update tomorrow.*
```

### Writing Guidelines

- Use proper markdown formatting (##, ###, **bold**, *italic*)
- NO EM-DASHES (use hyphens or commas instead)
- Be analytical and insightful
- Connect papers to broader trends
- Highlight industrial relevance when applicable
- End with a summary line: "*X papers cataloged. Next update tomorrow.*"

### Example Article

```markdown
---
title: "TTA-UC Discussion Section - March 15, 2026"
date: "2026-03-15"
edition: "Week 12"
---

## Field Pulse

Three significant papers this week shift the conversation around solid-state TTA-UC devices...

**Smith et al. in Science** demonstrates room-temperature operation without oxygen protection. This is the breakthrough the field has been waiting for...

## Industrial Lens

The Smith result matters for commercialization because...

---

*3 papers cataloged. Next update tomorrow.*
```

## Git Workflow

After making changes, commit and push:

```bash
cd ~/.openclaw/projects/tta-uc-tracker/site

# Check what changed
git status

# Add your changes
git add src/data/catalog.json
git add src/content/articles/2026-03-15.md

# Commit with clear message
git commit -m "Add 3 new papers and March 15 discussion"

# Push to GitHub (triggers auto-deploy)
git push origin main
```

## Deployment

Cloudflare Pages is configured to:
- Watch the GitHub repo
- Auto-build on push to `main`
- Run: `npm run build`
- Deploy from: `dist/`
- Site URL: https://tta-uc-tracker.pages.dev

**You don't need to do anything - just push to GitHub and wait 2-3 minutes for deployment.**

## Checking Deployment Status

1. Visit https://tta-uc-tracker.pages.dev to see the live site
2. Check the Cloudflare Pages dashboard for build logs
3. Run `gh pr status` to see if there are any GitHub issues

## Common Issues

### Build Fails
- Check that catalog.json is valid JSON (use `jq . < src/data/catalog.json`)
- Ensure article frontmatter has all required fields (title, date)
- Make sure there are no em-dashes in content

### Content Not Showing
- Clear browser cache
- Wait 2-3 minutes after push for deploy to complete
- Check Cloudflare Pages build logs

### JSON Syntax Errors
- Always add comma after previous entry when appending to catalog
- Don't leave trailing comma after last entry
- Use double quotes for strings, not single quotes

## Daily Workflow Summary

1. **Add papers:** Edit `src/data/catalog.json`, append new entries
2. **Write discussion:** Create `src/content/articles/YYYY-MM-DD.md`
3. **Commit:** `git add . && git commit -m "Add papers and discussion"`
4. **Push:** `git push origin main`
5. **Wait:** 2-3 minutes for auto-deploy
6. **Verify:** Visit https://tta-uc-tracker.pages.dev

## Questions?

This is a static site generator. Changes to content files (JSON, markdown) are automatically picked up during build. You never need to touch the Astro code in `src/pages/` unless you're changing the design.

Keep it simple: catalog + articles + git push = deployed site.
