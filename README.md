# KitsuPlay App Download

Responsive Next.js website for KitsuPlay Android downloads. It reads public GitHub Releases to display the latest stable APK, version history, release notes, and installation instructions.

## Stack
- Next.js App Router + TypeScript
- Responsive custom CSS
- GitHub REST API (public releases)
- Vercel hosting

## Run locally
Use Node.js 20.9+ (Node 22 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` before deployment.

## Publish an APK
1. Open the repository's Releases page and choose Draft a new release.
2. Add a tag such as `v1.0.0`.
3. Upload an APK named like `KitsuPlay-v1.0.0.apk`.
4. Add release notes and publish as a stable release.

The site selects the first `.apk` asset from the latest stable published release. Draft releases are excluded; prereleases are listed separately when they include an APK.

**Do not commit APK binaries to Git history.** Upload APKs as GitHub Release assets.

## Deploy to Vercel
Import `senseiCodeHub/KitsuPlay-App` into Vercel, select Next.js, keep root directory as `./`, and deploy from `main`. Vercel will provide the deployment URL. Connect a custom domain later if desired.

## Branding
The current page uses a custom CSS mockup and a temporary text logo. Replace these with the official KitsuPlay logo and screenshots when those assets are available. The CSS artwork is illustrative, not a real app screenshot.

## Notes
- Public release API responses are cached for 5 minutes.
- No database, Supabase, admin-panel integration, or GitHub token is required.
- If there is no APK attached, the site shows a safe fallback rather than a broken download link.
