# Serendib Trails — Tourism Analytics Group Project

An original, responsive, multi-page Sri Lanka tourism concept website. No build tools, database, framework or paid hosting required.

## Files
- `index.html` — Home
- `destinations.html` — Destinations
- `experiences.html` — Sample packages with CTA tracking
- `about.html` — Our Story
- `contact.html` — Functional *local demo* enquiry form
- `privacy.html` — Tracking notice
- `assets/styles.css` — All styling
- `assets/app.js` — navigation, cookie choice, GTM loader, dataLayer events, demo form
- `assets/config.js` — Replace placeholder GTM container ID
- `docs/SETUP_AND_GTM.md` — deployment and tracking walkthrough
- `docs/REPORT_AND_PRESENTATION.md` — report and presentation outline

## Run
Open `index.html` in a browser, or use VS Code Live Server. For testing and production-like deployment, use a web server (e.g. `python -m http.server 8000`). Deploy the complete folder to Netlify Drop or a static hosting provider. Vercel also supports static projects.

## IMPORTANT
- The website works immediately, but analytics require YOUR real GTM, GA4, and Meta IDs, proper GTM tag configuration, consent checks, published container and testing.
- Images are served from Unsplash and depend on internet access. Replace with appropriate licensed/local photos before final publication; validate each image shows the intended destination.
- **No demo enquiry data is sent anywhere.** The form does not save, email, or book anything. Only a non-identifying `generate_lead` analytics event is sent after consent.
- The site is a student exercise, not a real tourism service. Package durations and activities are illustrative and have no verified prices/availability.
- GTM loads only when analytics consent is granted. Marketing requires analytics + marketing consent. Revoking consent reloads the page and blocks further loading; for real production compliance use a vetted CMP and test cookie deletion and tracking thoroughly.
