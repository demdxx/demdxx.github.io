# Demdxx — Personal Site

Static personal website built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/), deployed to GitHub Pages.

## Stack

- Next.js (static export)
- Tailwind CSS v4
- English / Spanish / Russian / Japanese (i18n)
- GitHub Actions → `gh-pages` branch

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en/](http://localhost:3000/en/).

## Build

```bash
npm run build
```

Static output is written to `out/`.

## Deployment

Pushes to `master` trigger the GitHub Actions workflow, which builds the site and deploys `out/` to the `gh-pages` branch for [demdxx.com](https://demdxx.com).

## Structure

- `src/app/[locale]/` — localized pages (en, es)
- `content/` — legal page markdown (privacy, cookies, terms)
- `src/lib/i18n.ts` — translations and site config
- `public/CNAME` — custom domain for GitHub Pages
