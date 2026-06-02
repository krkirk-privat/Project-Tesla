# tesla-rabatkode.dk

A simple, modern, bilingual (Danish default + English) static website that
promotes a personal Tesla referral link/code:
**`kristoffer385020`** → <https://ts.la/kristoffer385020>

No build step. Just static HTML, CSS and a tiny bit of JS — served straight
from this repo via GitHub Pages.

## Structure

```
.
├── index.html         # Danish landing page (default, lang="da")
├── en/index.html      # English landing page (lang="en")
├── assets/
│   ├── style.css      # shared dark "Tesla" theme, responsive
│   ├── main.js        # copy-code button, FAQ accordion, scroll reveal
│   ├── favicon.svg
│   └── og-image.svg   # social share image (placeholder — replace with branded art)
├── CNAME              # custom domain for GitHub Pages
├── .nojekyll          # serve files as-is (don't run Jekyll)
├── robots.txt
└── sitemap.xml        # lists both / and /en/
```

## Bilingual SEO

Both languages live at **separate, crawlable URLs** so Google can index each
independently (Danish searches → `/`, English searches → `/en/`):

- Reciprocal `hreflang` tags (`da`, `en`, `x-default`) on both pages.
- Per-language `<title>`, meta description, canonical, Open Graph + Twitter tags.
- `WebSite` + `FAQPage` JSON-LD structured data.
- `sitemap.xml` lists both URLs with their `hreflang` alternates.

## Local preview

Just open `index.html` in a browser, or run a tiny static server so the
absolute `/assets/...` and `/en/` paths resolve correctly:

```powershell
# Python 3
python -m http.server 8000
# then visit http://localhost:8000/
```

## Deploy to GitHub Pages

1. Push to the `main` branch (already the default here).
2. On GitHub: **Settings → Pages**
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` / `/ (root)` → **Save**
3. Under **Custom domain**, confirm `tesla-rabatkode.dk` (the `CNAME` file sets
   this automatically). Enable **Enforce HTTPS** once the certificate is issued.

### DNS records (at your .dk registrar)

For the apex domain `tesla-rabatkode.dk`, create **A** records to GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

(and optionally the matching **AAAA** records:
`2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`).

If you also want `www.tesla-rabatkode.dk`, add a **CNAME** record pointing to
`krkirk-privat.github.io`.

DNS can take up to ~24h to propagate. The site will be live on
`https://krkirk-privat.github.io/Project-Tesla/` first, then on the custom
domain once DNS resolves.

> Verify the current GitHub Pages IPs at
> <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>
> in case they change.

## After launch

- Submit `sitemap.xml` in [Google Search Console](https://search.google.com/search-console)
  and request indexing for both `/` and `/en/`.
- Replace `assets/og-image.svg` and `assets/favicon.svg` with branded artwork if
  desired (for best social-preview support, also export the OG image as a
  1200×630 PNG and update the `og:image` / `twitter:image` URLs).

## Disclaimer

This is a private referral site, **not** affiliated with, sponsored by, or
endorsed by Tesla, Inc. "Tesla" is a trademark of Tesla, Inc. Referral benefits
are set solely by Tesla and may change without notice.
