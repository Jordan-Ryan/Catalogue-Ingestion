# Catalogue Ingestion UI

ASOS-inspired catalogue item approval interface built with Next.js and Tailwind CSS.

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
