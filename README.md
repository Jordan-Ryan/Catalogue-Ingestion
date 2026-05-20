# Catalogue Ingestion UI

Catalogue item approval interface built with Next.js and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy on GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

### One-time GitHub setup
1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

After that, each push to `main` will build and deploy a static export of the app.


## Deploy on Vercel (recommended for Next.js)

This project is now configured to:
- run **normal Next.js output** on Vercel,
- use **static export only** during GitHub Actions Pages builds.

If you deploy to Vercel:
1. Import the GitHub repository in Vercel.
2. Keep framework preset as **Next.js**.
3. No custom output directory is needed.
4. Redeploy after pulling the latest commit.
