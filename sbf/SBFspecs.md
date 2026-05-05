# South Bay Fence Co. — Website Redesign Specs

**Reference Site (Current):** https://southbayfence.com  
**Design Inspiration:** https://gcfenceco.com  
**Goal:** A visually-driven, conversion-focused website that generates phone calls and estimate requests.

---

## 🎯 Core Goals

- **Convert visitors into phone calls** — phone number prominent everywhere
- **Estimate Request form is a priority** — easy to find, easy to fill out
- **Show, don't tell** — let the photos do the talking, minimal text
- **Photo-first Gallery** — the renamed project photos should drive the website structure
- **SEO best practices** — rank locally in San Diego for fence-related searches
- **Feel alive and modern** — like GC Fence Co. but cleaner and less wordy

---

## 🏠 Homepage

- **Full-screen carousel** as the hero (above the fold)
  - High-quality project photos rotating automatically
  - Overlay with minimal text: tagline + 2 CTAs ("Call Now" & "Get A Quote")
  - Smooth transitions, no clunky animations
  - ⭐ **Owner's Note:** The chain link fence photo currently used in the homepage carousel on `southbayfence.com` is a favorite — **keep this photo in the carousel**, same placement/prominence
- Below the fold: quick gallery photo cards using renamed image assets
- Gallery photo cards should act as visual navigation into related work
- Single trust bar: "Family Owned Since 1960 · San Diego · No Job Too Tough"
- One short testimonial or quote — no paragraph walls
- Final CTA section: prominent "Request an Estimate" button

---

## 📋 Estimate Request Page

- **High priority page** — linked in navbar and from every CTA
- Clean, simple form layout
- Fields: Name, Phone, Email, Project Type, Notes
- Downloadable PDF estimate sheet (current PDF to be kept)
- Submission options: online form OR email OR drop off in person
- Address: 3084 Main St., Chula Vista, CA 91911

---

## 📱 Design & UX

- Mobile-first design
- Sticky header with phone number and "Get A Quote" button always visible
- Click-to-call phone number on mobile: `(619) 420-3410`
- Fast load times — compressed images, minimal JS
- Clean sans-serif typography
- Color palette pulled from existing branding (dark/neutral + brand accent)

---

## 🔍 SEO Best Practices

- `<title>` tags with local keywords (e.g. "Chain Link Fence Contractor San Diego")
- Meta descriptions for every page
- Heading hierarchy (H1 → H2 → H3) used correctly
- Image `alt` tags on every photo
- Descriptive image filenames should be used wherever possible (example: `chain-link-fence-san-diego.jpg`, not `SBFCO-3.jpg`)
- Gallery/category pages or filtered sections should use keywords matching the renamed photos
- Local business schema markup (JSON-LD)
- Google Business Profile link/embed
- Fast page speed (Core Web Vitals compliant)
- Sitemap (`sitemap.xml`) and `robots.txt`
- Pages targeting local keywords:
  - "fence contractor san diego"
  - "chain link fence chula vista"
  - "commercial fence installation san diego"
  - "custom gate installation san diego"

---

## 🗂️ Pages

| Page | Purpose |
|---|---|
| Home | Full-screen carousel, CTAs, trust signals |
| About | Short, photo-heavy — who we are |
| Gallery | Main photo/category hub. Each picture represents a fence type and opens that category's matching photos |
| Estimate Request | Form + downloadable PDF sheet |
| Contact | Map, phone, email, address |

**Front-end navigation note:** Specialties and Portfolio should be replaced with one public **Gallery** tab. Portfolio-style content should live inside Gallery as category-driven photo groups.

---

## 💡 Features Inspired by GC Fence Co.

- Alive, energetic feel with bold imagery
- Card-based service layout
- Clean navigation
- **Picture/category system for Gallery** — swipeable or grid-based on mobile
- Less copy, more visuals

---

## 🖼️ Gallery / Photo Categories

Gallery should be built from the renamed project photos. The page should feel like a visual menu of real work, not a text-heavy services page.

Primary categories:

1. **Chain Link Fence**
2. **Chain Link Enclosure**
3. **Batting Cages & Tennis Courts**
4. **Custom Iron School Projects**
5. **Commercial Iron**
6. **Guard Rails**

Notes:

- The owner listed "chain link enclosure" twice; treat that as an important category, not two separate duplicate cards.
- Clicking a specialty image should show all photos for that category, e.g. clicking "Chain Link Fence" opens/displays all chain-link photos.
- Avoid a separate Portfolio tab on the front end. The specialty categories are the portfolio experience.
- Use the renamed image filenames to group photos logically.
- Keep category copy short. The images should do most of the selling.

---

## 📞 Conversion Elements (Every Page)

- Sticky top bar or header with `(619) 420-3410` — click to call
- "Get A Quote" CTA button in navbar
- Footer CTA: "Ready to Start? Call or Request an Estimate"
- No dead ends — every page leads to a call or form

---

## 🚫 What to Remove / Avoid

- Long paragraphs of marketing copy
- Redundant sections saying the same thing
- Heavy page load / unoptimized images
- Cluttered layouts
- Front-end Portfolio tab/page as a separate user-facing destination
- Generic specialty cards that do not lead to related photos

---

## 📁 Assets

- Logo: `images/logo.png` (light) / `images/Logo-wht-version.png` (white/footer)
- Project photos: renamed descriptive files in `images/`
- Bad photos: keep all `badphoto*.jpg` files in `images/bad-photos/` before final build decisions
- Estimate PDF: existing downloadable form
- Phone: `(619) 420-3410`
- Email: `info@southbayfence.com`
- Address: 3084 Main St., Chula Vista, CA 91911
