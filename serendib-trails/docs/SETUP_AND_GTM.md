# Full setup guide — Serendib Trails

## 1. Publish your website (10–20 minutes)
1. Extract the ZIP. Confirm that `index.html`, other HTML pages and `assets` folder remain together.
2. Test locally with VS Code Live Server or `python -m http.server 8000`.
3. Upload folder to Netlify Drop at https://app.netlify.com/drop (or deploy to Vercel/GitHub Pages). Save the public website URL. Do not use private or localhost URLs for live analytics demos.
4. Browse every page; check responsive design and enquiry form. The form is demo-only.

## 2. Create Google Tag Manager
1. Visit https://tagmanager.google.com/ and create account + WEB container (website URL is your deployed URL).
2. Copy ID resembling `GTM-ABC1234`.
3. Open `assets/config.js` and replace `GTM-XXXXXXX` with YOUR ID. Redeploy your updated site.
4. GTM container will only load if visitors select Analytics or Accept All in the on-site consent banner. Select Accept All for your own testing.
5. Use Tag Assistant / GTM Preview to verify loading. You may need to reset previously rejected cookie preferences via footer > Cookie preferences.

## 3. Connect Google Analytics 4 through GTM
1. Create a GA4 property and Web data stream for your public site URL at https://analytics.google.com/.
2. Copy the measurement ID `G-XXXXXXXXXX`.
3. In GTM: Tags > New > Google tag; paste this measurement ID; use Initialization — All Pages / All Pages as appropriate, with consent controls configured and verified. Do not paste the GA4 script into site HTML too, since it would duplicate traffic.
4. Consent: Basic consent mode is used, where GTM is not loaded prior to analytics opt-in; configure the Google tag's consent correctly and inspect Consent in Tag Assistant.
5. Publish GTM container and verify page_view in GA4 Realtime/DebugView.

## 4. Configure events through GTM to GA4
The website pushes the following dataLayer events **only after analytics consent**:

| Event | When | Data layer variables |
|---|---|---|
| `view_experience` | Clicking a destination's Explore experience link | `item_id`, `page_path` |
| `select_package` | Clicking Enquire now on an experience | `item_id`, `page_path` |
| `cta_click` | Clicking the main header Plan your trip CTA | `link_location`, `page_path` |
| `generate_lead` | Successfully completing demo enquiry form | `lead_type`, `experience_category`, `page_path` |

For each custom event:
1. GTM > Triggers > New > Custom Event > exact event name (e.g. `select_package`).
2. GTM > Variables > New > Data Layer Variable: for example `item_id`; repeat for other parameters you want.
3. GTM > Tags > New > Google Analytics: GA4 Event; associate your Google tag/Measurement ID and give the event name exactly as above. Attach matching Custom Event trigger.
4. Preview, test a click, inspect whether event and parameters appear in Tag Assistant; Publish.
5. In GA4 > Admin > Events / Key events, mark `generate_lead` as a key event if appropriate.
6. Standard `page_view` is automatically handled by the Google tag; do not create a second custom page_view tag.

## 5. Connect Meta Pixel via GTM (with separate consent)
1. Create a Meta dataset/Pixel in Meta Events Manager: https://business.facebook.com/events_manager2
2. Copy Pixel ID (numeric).
3. In GTM create a consent-aware Meta Pixel tag through a reputable vetted community template, or Custom HTML tag. Configure Pixel init + PageView for each allowed page load.
4. IMPORTANT: require **both `analytics_storage` and `ad_storage`** (or equivalent effective consent logic) before Meta Pixel fires. The website only loads GTM when analytics opt-in is granted; marketing remains a separate opt-in. A GTM Meta Custom HTML tag MUST use Advanced Settings > Consent Settings > Require additional consent for tag to fire: `ad_storage` (and `analytics_storage` if applicable); verify in Preview. This is essential: **consent is not enforced merely because GTM loaded**.
5. For your assignment map `generate_lead` -> Meta `Lead` event, when marketing consent is granted. Avoid sending personal data to Meta. Do not fire Pixel Lead if marketing is denied.
6. Publish the container; validate PageView and Lead in Meta Events Manager > Test Events / Meta Pixel Helper.
7. Note: the website requests analytics+marketing together if marketing is checked in the banner; Meta does not load without advertising consent. For production, use an audited consent platform and implement reliable tag removal/revocation controls.

## 6. Debug and collect evidence
- Consent rejected -> GTM should not load on fresh page, and no GA4/Meta events.
- Analytics only -> GTM + GA4 yes; Meta no.
- Accept all -> GTM + GA4 + Meta yes, after publication.
- Verify these in DevTools Network, GTM Preview, GA4 Realtime, Meta Test Events.
- Screenshot GTM tags/triggers/variables, consent state, GA4 event list, traffic acquisition, engagement, Meta Test Events, and responsive pages.
- Ask real opted-in testers to visit different pages, click explore/enquire buttons and complete dummy enquiry. Do not invent visitor counts.
- Use UTM parameters when sharing campaign test URLs: `?utm_source=instagram&utm_medium=social&utm_campaign=discover_serendib_2026`.

## 7. Caveats
- IDs are not present in the supplied source because only you can create/authorize your GTM, GA4 and Meta accounts.
- Track under valid informed consent and review privacy notices/policies before real data collection.
- The current custom cookie mechanism is academic demonstration quality rather than a production certified CMP.
- Some browsers/ad blockers block GA4 or Meta tags, and analytics reports may lag.
- A published site cannot generate real analytics history retroactively.
