# Veera Ravichandran — personal site

Static site, no build step. Deployed to GitHub Pages by the workflow in `.github/workflows/pages.yml` on every push to `main`.

## Edit content

All copy lives in **`content.js`**. Update the strings there, push, and the site redeploys automatically.

```
content.js     ← all copy: hero, about, experience, projects, skills, contact
index.html     ← markup
styles.css     ← design system
main.js        ← rendering + animations + theme toggle
```

## Run locally

Any static file server works. Two easy options:

```bash
python -m http.server 5173
# or
npx http-server -p 5173
```

Then open http://localhost:5173.

## Enabling Pages (one-time)

1. Push to `main`.
2. In the GitHub repo: **Settings → Pages → Source → GitHub Actions**.
3. The workflow will publish to `https://vrchandran12-dev.github.io/website-/`.
