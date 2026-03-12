# GitHub Auto-Deploy Setup - Quick Guide

## Current Status

✅ Site is live: https://tta-uc-tracker.pages.dev
✅ GitHub repo exists: https://github.com/chadeth/tta-uc-tracker
✅ Cloudflare Pages project exists: `tta-uc-tracker`
⏳ **Pending:** Connect GitHub repo to CF Pages for auto-deploy

## What You Need to Do (5 Minutes)

### Option 1: Via Cloudflare Dashboard (Recommended)

1. **Open Cloudflare Pages Settings:**
   https://dash.cloudflare.com/4a7e4f3a80ddd432ad372a6a8597f14f/pages/view/tta-uc-tracker/settings

2. **Find "Builds & deployments" or "Source" section**
   - Look for a button like "Connect to Git" or "Connect repository"

3. **Click and follow the prompts:**
   - Authorize Cloudflare Pages to access your GitHub account (if not already authorized)
   - Select repository: `chadeth/tta-uc-tracker`
   - Production branch: `main`

4. **Configure Build Settings:**
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (leave blank/default)
   - Node version: `20` or `22`

5. **Save & Deploy**
   - It will trigger an initial build
   - Wait 2-3 minutes
   - Check https://tta-uc-tracker.pages.dev

### Option 2: Recreate Project with GitHub Connection

If the dashboard doesn't have a "Connect to Git" option (because the project was created manually):

1. **Delete existing project:**
   ```bash
   export CLOUDFLARE_ACCOUNT_ID=4a7e4f3a80ddd432ad372a6a8597f14f
   wrangler pages project delete tta-uc-tracker
   ```

2. **Go to Cloudflare Dashboard:**
   https://dash.cloudflare.com/4a7e4f3a80ddd432ad372a6a8597f14f/pages

3. **Click "Create a project"**

4. **Select "Connect to Git"**

5. **Authorize GitHub** (if prompted)

6. **Select repository:** `chadeth/tta-uc-tracker`

7. **Configure build:**
   - Project name: `tta-uc-tracker`
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`

8. **Save and Deploy**

## Verification

Once connected, test the auto-deploy:

1. **Make a test change:**
   ```bash
   cd ~/.openclaw/projects/tta-uc-tracker/site
   echo "\nTest update" >> README.md
   git add README.md
   git commit -m "Test auto-deploy"
   git push origin main
   ```

2. **Watch the deployment:**
   - Go to https://dash.cloudflare.com/.../pages/view/tta-uc-tracker
   - You should see a new deployment appear
   - It will show build logs in real-time

3. **Verify site updates:**
   - Wait 2-3 minutes for build to complete
   - Visit https://tta-uc-tracker.pages.dev
   - Check that changes are live

## Future Deployments

After setup is complete, deployments are automatic:

```bash
# Make changes
vim src/data/catalog.json
vim src/content/articles/2026-03-13.md

# Commit and push
git add .
git commit -m "Add new papers and discussion"
git push origin main

# That's it! Cloudflare auto-deploys in 2-3 minutes
```

## Manual Deployment (Fallback)

If auto-deploy doesn't work or you need to deploy immediately:

```bash
cd ~/.openclaw/projects/tta-uc-tracker/site
npm run build
export CLOUDFLARE_ACCOUNT_ID=4a7e4f3a80ddd432ad372a6a8597f14f
wrangler pages deploy dist --project-name=tta-uc-tracker
```

## Troubleshooting

### "Project already exists"
- The project exists but isn't connected to Git
- Use Option 2 above (delete and recreate with GitHub)

### Build fails with "command not found: npm"
- In CF dashboard, set Environment Variable: `NODE_VERSION=20`
- Or change build command to: `npx npm install && npx npm run build`

### Changes pushed but site not updating
- Check CF Pages dashboard for build logs
- Verify webhook exists in GitHub repo settings → Webhooks
- Try manual rebuild in CF dashboard

### Need to reauth GitHub
- Go to https://dash.cloudflare.com/.../profile
- Find "Integrations" or "Connected Accounts"
- Reconnect GitHub if needed

## That's It!

Once this is done, the workflow for agents is:
1. Edit JSON/markdown files
2. `git push`
3. Site auto-updates in 2-3 minutes

No manual deployment needed.
