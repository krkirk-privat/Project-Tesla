# Deploy & SEO checklist — tesla-rabatkode.dk

Follow these in order. **Steps 1–3 are the ones that actually unlock search
traffic** — until the custom domain is live and verified in Google Search
Console, the site effectively can't rank.

---

## 1. Enable GitHub Pages

1. Go to the repo → **Settings → Pages**.
2. **Source:** *Deploy from a branch*.
3. **Branch:** `main` / `/(root)` → **Save**.
4. The site goes live at `https://krkirk-privat.github.io/Project-Tesla/`
   within a minute or two. Confirm it loads and is styled.

## 2. Connect the custom domain `tesla-rabatkode.dk`

> Important: every canonical / hreflang / Open Graph URL in the site points to
> `https://tesla-rabatkode.dk/`. Search engines will treat **that** as the real
> site, so it must resolve. Until then, indexing won't work properly.

**a) Add DNS records at your .dk registrar** (e.g. one.com, Simply, GratisDNS):

Apex domain `tesla-rabatkode.dk` → four **A** records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optional but recommended — matching **AAAA** records (IPv6):

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

Optional `www` subdomain → one **CNAME** record:

```
www  →  krkirk-privat.github.io
```

**b) Set the custom domain in GitHub:** Settings → Pages → **Custom domain** →
enter `tesla-rabatkode.dk` → **Save**. This recreates the `CNAME` file in the
repo. (It was previously removed; re-adding the domain here puts it back.)

**c)** Once GitHub verifies DNS (can take minutes to ~24h), tick
**Enforce HTTPS**.

**d)** Verify both URLs load over HTTPS:
- <https://tesla-rabatkode.dk/>
- <https://tesla-rabatkode.dk/en/>

## 3. Google Search Console (do this the same day the domain is live)

1. Go to <https://search.google.com/search-console> and add a property.
2. Use a **Domain** property (`tesla-rabatkode.dk`) and verify via the **DNS TXT
   record** Google gives you (add it at the same registrar as step 2a).
3. Submit the sitemap: **Sitemaps** → enter `sitemap.xml` → **Submit**.
4. Use **URL Inspection** on both `/` and `/en/` → **Request indexing**.
5. (Optional) Repeat with [Bing Webmaster Tools](https://www.bing.com/webmasters)
   for Bing/DuckDuckGo coverage.

## 4. Validate the technical SEO

- **Rich results / FAQ:** <https://search.google.com/test/rich-results> — paste
  each URL, confirm the `FAQPage` structured data is detected.
- **Mobile / Core Web Vitals:** <https://pagespeed.web.dev> — should score very
  high (static site, no heavy assets).
- **Social preview:** share a URL on LinkedIn/Facebook or use
  <https://www.opengraph.xyz> to confirm `og-image.png` renders.

---

## What still drives ranking (beyond this repo)

On-page SEO here is strong, but a brand-new domain has **no authority**. To
actually win search traffic for competitive terms like "Tesla rabatkode" /
"Tesla henvisningskode":

- **Backlinks:** get the site linked from EV forums, Facebook groups, Reddit
  (r/elbil, r/TeslaDenmark), your own social profiles, etc. This is the single
  biggest factor for a new site.
- **Fresh, accurate content:** keep the referral benefits up to date (Tesla
  changes them), and consider adding a short blog/guide section over time.
- **Patience:** ranking a new domain typically takes weeks to months. Search
  Console's Performance tab will show impressions/clicks as it ramps.

## Keeping content accurate

The referral benefits (1,000 km free Supercharging / Model S–X discount) come
from public sources and **should be verified against your live referral page**
(`tesla.com/da_dk/referral/kristoffer385020`). If Tesla changes the program,
update the benefit wording in `index.html` and `en/index.html`, bump `<lastmod>`
in `sitemap.xml`, and commit.
