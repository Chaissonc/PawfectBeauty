---
name: SEO Audit Sprint — April 2026
description: Design spec for 12 SEO improvements derived from the April 1, 2026 audit of pawfectbeauty.com (score: 75/100)
type: project
---

# SEO Audit Sprint — April 1, 2026

## Context

Audit score: **75/100**. No critical issues. All changes are in one sprint (Option A). Three items confirmed non-actionable: reviewCount is already accurate at 5, footer lazy-loading is already correct, and the GitHub Pages cache TTL is not configurable without a host migration.

---

## Section 1 — On-Page HTML (4 changes)

### 1a. H1 keyword targeting — `index.html:194`

**Current:** `<h1 class="subHeader"> We Pamper Your Pet to Pawfection </h1>`
**New:** `<h1 class="subHeader">Dog Grooming Salon in Las Vegas, NV</h1>`

The title tag already targets "dog grooming Las Vegas." The H1 must reinforce it.

### 1b. Service names → heading elements — `services/index.html`

Five `<p class="service-name">` tags → `<h2 class="service-name">`:
- Full Groom
- Bath & Tidy
- Bath & Nails
- Express Service — No Kennel Time
- Anxious, Nervous & Senior Dogs

Note: `pricing/index.html` does not use `service-name` class — its service titles are already in `<h2>` via the ItemList schema structure, so no change needed there.

### 1c. Meta description consistency — `about/index.html`

Three meta tags (`description`, `og:description`, `twitter:description`) say "30+ years combined experience." Homepage body copy says "32 years." Update all three about-page metas to "32 years combined experience" for specificity and consistency.

### 1d. Contact typo — `contact/index.html:54`

`"or create a email below"` → `"or send an email below"`

---

## Section 2 — Schema / Structured Data (4 changes)

### 2a. areaServed + hasMap — `index.html` LocalBusiness JSON-LD

Add inside the existing LocalBusiness schema block:

```json
"areaServed": {
  "@type": "City",
  "name": "Las Vegas",
  "sameAs": "https://en.wikipedia.org/wiki/Las_Vegas"
},
"hasMap": "https://maps.google.com/?q=8665+W+Flamingo+Rd+Ste+105+Las+Vegas+NV+89147"
```

### 2b. Person schema — `about/index.html`

New `<script type="application/ld+json">` block with two Person entities:

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mihsha",
    "jobTitle": "Owner & Head Groomer",
    "worksFor": { "@type": "LocalBusiness", "name": "Pawfect Beauty" },
    "description": "Professional dog groomer with 18+ years of experience, co-owner of Pawfect Beauty in Las Vegas, NV."
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jenny",
    "jobTitle": "Owner & Head Groomer",
    "worksFor": { "@type": "LocalBusiness", "name": "Pawfect Beauty" },
    "description": "Professional dog groomer with 14 years of experience, co-owner of Pawfect Beauty. Specializes in senior, nervous, and feisty dogs."
  }
]
```

### 2c. FAQPage schema — `faq/index.html`

New `<script type="application/ld+json">` block using all 10 Q&A pairs from the page:

1. How do I book an appointment?
2. Do I need to bring vaccine records?
3. How long does a grooming appointment take?
4. Do you accept walk-ins?
5. My dog is anxious or nervous — can you still help?
6. What's included in a Full Groom?
7. How often should I groom my dog?
8. Do you groom all breeds and sizes?
9. What is Express Service?
10. What payment methods do you accept?

### 2d. BreadcrumbList schema — 6 interior pages

Add `<script type="application/ld+json">` to each interior page with a `Home → [Page]` breadcrumb:

| Page | Breadcrumb |
|------|------------|
| `services/index.html` | Home → Our Services |
| `pricing/index.html` | Home → Pricing |
| `about/index.html` | Home → About Us |
| `contact/index.html` | Home → Contact Us |
| `faq/index.html` | Home → FAQ |
| `privacy/index.html` | Home → Privacy Policy |

---

## Section 3 — Technical Tags + Sitemap (3 changes)

### 3a. Sitemap lastmod — `sitemap.xml`

Add `<lastmod>2026-04-01</lastmod>` to all 7 `<url>` entries.

### 3b. Preconnect — `contact/index.html` and `about/index.html`

Formspree is the only external resource actually embedded on pages (groomer.io is a plain external link, not an iframe/script). Add to `<head>` on both pages:

```html
<link rel="preconnect" href="https://formspree.io">
```

### 3c. twitter:image — all 7 pages

All pages use `twitter:card: summary_large_image` but don't explicitly declare `twitter:image`. Add to each page's `<head>`:

```html
<meta name="twitter:image" content="https://pawfectbeauty.com/Assets/Logos/socialimage.png">
```

Pages: `index.html`, `services/`, `pricing/`, `about/`, `contact/`, `faq/`, `privacy/`

---

## Section 4 — llms.txt (1 change)

Update `llms.txt` to add:
- Specific hours: `Tuesday–Saturday, 8 AM–4 PM. Closed Sunday and Monday.`
- Page-level descriptions section

```
## Pages
- / Home page — dog grooming salon overview, services summary, testimonials
- /services/ Dog grooming services offered
- /pricing/ Transparent pricing by dog size
- /about/ Meet Mihsha and Jenny
- /faq/ Booking, vaccines, anxious dogs, grooming frequency
- /contact/ Location, map, contact form
```

---

## File Change Summary

| File | Changes |
|------|---------|
| `index.html` | H1 text, areaServed+hasMap schema, twitter:image |
| `services/index.html` | 5× p→h2 service names, BreadcrumbList schema, twitter:image |
| `pricing/index.html` | BreadcrumbList schema, twitter:image |
| `about/index.html` | 3 meta fixes (30+→32), Person schema, BreadcrumbList, preconnect, twitter:image |
| `contact/index.html` | Typo fix, BreadcrumbList schema, preconnect, twitter:image |
| `faq/index.html` | FAQPage schema, BreadcrumbList schema, twitter:image |
| `privacy/index.html` | BreadcrumbList schema, twitter:image |
| `sitemap.xml` | lastmod on all 7 URLs |
| `llms.txt` | Hours + page descriptions |

**Total: 12 code changes across 9 files.**
