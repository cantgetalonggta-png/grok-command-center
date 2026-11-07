# Grok Command Center

Static operations console distilled from a Grok agent session:

- Session diagnostics identity
- invideo credits + project links
- 193 video model catalog with search/pin recipes
- Budget planner (≤50 credits heuristics)
- Connector + skill inventory
- Client-side QA suite

## Local

```bash
npm start
# open http://localhost:4173
```

## Tests

```bash
npm test
```

## Deploy — Vercel

1. Go to https://vercel.com/new
2. Import this repository **or** upload the `public/` folder
3. Framework preset: **Other**
4. Root/output: static files in `public/` (or project root if you deploy only `public`)

No Vercel OAuth was available in the agent session; use your Vercel account UI/CLI:

```bash
npx vercel --prod --yes
```

## Deploy — GitHub Pages

Push repo, then Settings → Pages → Deploy from branch (`main` / `/docs` or `/` if `public` is root via action).

## Safety

- No API secrets are stored in this site.
- invideo generation is **not** auto-executed from the UI (recipes only).
- `run-everything-activation` skill is documentation-only and is not invoked as a bulk executor.
