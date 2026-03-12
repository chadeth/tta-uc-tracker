# Cloudflare Pages GitHub Integration Setup

## Current Status

✅ **Site deployed and working:** https://tta-uc-tracker.pages.dev (redirects to latest deployment)
✅ **GitHub repo created:** https://github.com/chadeth/tta-uc-tracker
✅ **Build tested:** `npm run build` successfully creates `dist/` directory
✅ **Manual deployment working:** Can deploy with `wrangler pages deploy dist`

## What's Left: GitHub Auto-Deploy

The Cloudflare Pages project `tta-uc-tracker` exists but is not yet connected to the GitHub repo for automatic deployments on push. You need to connect them via the Cloudflare dashboard.

### Steps to Complete Setup

1. **Go to Cloudflare Pages dashboard:**
   https://dash.cloudflare.com/4a7e4f3a80ddd432ad372a6a8597f14f/pages/view/tta-uc-tracker/settings

2. **Look for "Builds & Deployments" section**

3. **Connect to Git / GitHub:**
   - Click "Connect to Git" or similar button
   - Authorize the Cloudflare Pages GitHub App if prompted
   - Select the repository: `chadeth/tta-uc-tracker`
   - Branch: `main`

4. **Configure Build Settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave as default)
   - **Node version:** 22.x or 20.x

5. **Save and Deploy**

### Alternative: Recreate Project with GitHub

If the above doesn't work, you can delete and recreate the project:

```bash
cd ~/.openclaw/projects/tta-uc-tracker/site
export CLOUDFLARE_ACCOUNT_ID=4a7e4f3a80ddd432ad372a6a8597f14f

# Delete existing project
wrangler pages project delete tta-uc-tracker

# Then go to Cloudflare dashboard and create new project:
# 1. Pages -> Create a project -> Connect to Git
# 2. Select chadeth/tta-uc-tracker
# 3. Set build command: npm run build
# 4. Set build output: dist
```

## Testing Auto-Deploy

After connecting GitHub:

1. Make a small change to the site
2. Commit and push to `main`
3. Watch Cloudflare Pages dashboard for auto-build
4. Wait 2-3 minutes
5. Check https://tta-uc-tracker.pages.dev for updates

## Manual Deploy Command

If you need to deploy manually before GitHub is connected:

```bash
cd ~/.openclaw/projects/tta-uc-tracker/site
npm run build
export CLOUDFLARE_ACCOUNT_ID=4a7e4f3a80ddd432ad372a6a8597f14f
wrangler pages deploy dist --project-name=tta-uc-tracker
```

## Troubleshooting

### Build fails on Cloudflare
- Check Node version in dashboard (use 20.x or 22.x)
- Ensure build command is exactly: `npm run build`
- Ensure output directory is exactly: `dist`

### Site doesn't update after push
- Check Cloudflare Pages dashboard for build logs
- Verify webhook is set up in GitHub repo settings
- Try manual rebuild in dashboard

### "Project not found" error
- Make sure CLOUDFLARE_ACCOUNT_ID is set correctly
- Verify you're logged into wrangler: `wrangler whoami`
- Reauth if needed: `wrangler login`

## Site URLs

- **Production:** https://tta-uc-tracker.pages.dev
- **Latest deployment:** https://94d6803e.tta-uc-tracker.pages.dev (changes with each deploy)
- **GitHub repo:** https://github.com/chadeth/tta-uc-tracker

## Account Info

- **Cloudflare Account ID:** 4a7e4f3a80ddd432ad372a6a8597f14f
- **GitHub Account:** chadeth
- **Pages Project:** tta-uc-tracker
