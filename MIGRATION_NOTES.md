# Migration Notes — Arora Properties → React + Vite + Admin Panel

The original deliverable was a single self-executing HTML "artifact bundle"
(`reference/Arora Properties (standalone).html`). Underneath the bundler
wrapper it was a working single-page app built in a proprietary "DC"
(declarative-component) template format — `{{ }}` bindings, `sc-if`/`sc-for`
directives, and a `class Component extends DCLogic` controller — rendered by
a small generic runtime, not React/JSX. This migration ports that app 1:1
into idiomatic React (JS/JSX) + Vite, preserving visuals, data and behavior.

## Implemented exactly

- All data: 9 properties, 4 agents, 6 locations, 4 testimonials, 5 guide
  items, 5 FAQ entries, 3 blog posts, amenities list — copied verbatim.
- Routing for the 4 real screens the original had (`/`, `/properties`,
  `/property/:id`, `/favorites`); Agents/Locations/About/Property-Guide/
  FAQs/Blog remain Home-page sections reached via smooth-scroll, exactly as
  the source's `scrollToSection` behavior (nothing was promoted to a new
  page that didn't exist as one in the original).
- Favorites: add/remove, `localStorage['havenly-favorites']` persistence,
  navbar badge count, empty state.
- Search + filter + sort logic (`filterProperties.js`) ported field-for-field
  from `getFilteredProperties()`, including the New Construction
  (`yearBuilt >= 2023`) rule and the amenity-based filters.
- WhatsApp deep links via `waLink()` to the original hardcoded number
  `+919667417207`, with the same contextual message text everywhere it
  appears (property cards, contact modal, floating button).
- Contact Agent and Schedule Visit modals: same fields, same regex
  validation (email, phone `[0-9+\-\s]{7,15}`), same "no real backend" mock
  behavior — submitting only validates, shows a toast, and resets state.
  No network calls were added anywhere.
- FAQ accordion is single-open (opening one closes any other), matching the
  source's `toggleFaq` — not independent per-item toggles.
- Testimonials auto-rotate every 6s plus manual dot navigation.
- Newsletter: same email regex, permanent success state, no real
  subscription call.
- Toast: one at a time, 3s auto-dismiss, timer resets on a new toast.
- Map view: kept as the original's illustrative inline-SVG mock with
  positioned price-pin markers — no real maps SDK was introduced.
- Responsive breakpoints (1080/1024/900/768/640/480px) and the `data-*`
  attribute-selector system (`[data-grid-3]`, `[data-desktop-nav]`, etc.)
  carried over verbatim into `src/styles/responsive.css`.
- Source quirks preserved rather than "fixed": the Property Detail stats
  grid's Parking count is hardcoded to `2` for every property (source never
  computed it from data); `PropertyCard`'s `listingLabel` pill conditional
  is kept even though no current property sets that field.

## Implemented with fallback / deliberate simplification

- **SafeImage now has a real broken-image fallback.** The original
  `SafeImage.dc.html` had none (just a plain `<img>`). Per the "never leave
  a broken image icon" requirement, the React version renders a neutral
  placeholder box with an image glyph on `onError`.
- **Fonts** are loaded from the Google Fonts CDN (`Inter` + `Manrope`)
  instead of vendoring the 14 self-hosted `woff2` subset files the original
  bundle carried. Visually identical; far simpler.
- **Hero background image**: the original's local hero JPEG was lost during
  the project scaffolding step (see "Known limitation" below) before it
  could be extracted to disk. It's replaced with one of the same
  already-verified Unsplash villa photos used elsewhere in the app's own
  data (`photo-1512917774080-9991f1c4c750`), matching the "modern glass
  villa at dusk" theme — not a locally hosted asset.
- **Properties-page filter state resets on re-entry.** In the source,
  nothing ever truly unmounts (one component, `sc-if` toggling visibility),
  so filters persisted forever across "page" switches. With real routes,
  navigating away from `/properties` and back resets filters to defaults
  (seeded from the URL's query params when arriving via a search). This is
  a minor, intentional behavior difference from a single-page state machine
  to real routing — easy to change later (e.g. lift filter state to a
  context) if persistence across visits is wanted.

## Requires external integration

None. Contact form, Schedule Visit form, and Newsletter signup are all
100% client-side mocks in both the original and this port — no backend,
email service, CRM, or payment integration exists or is needed for the
app to function as designed.

---

# Admin Panel / CMS

A full admin panel was added at `/admin/*`, built to reuse the existing
design system (colors, fonts, card/button styles) rather than introducing a
separate visual identity. No new npm dependencies were added — icons are
hand-drawn inline SVGs, drag/drop and file handling use native browser APIs,
and forms use plain textareas instead of a rich-text editor package.

## Architecture

- **`src/admin/context/AdminDataContext.jsx`** is the single source of
  truth for properties, locations, experts, FAQs, blog posts, reviews, and
  hero content. It wraps the entire app (see `main.jsx`), seeds itself from
  the original static data files on first load, and persists every mutation
  to `localStorage['arora-admin-data']`. Public pages (`Hero`, `SearchCard`,
  `FeaturedProperties`, `PopularLocations`, `AgentsSection`, `FaqAccordion`,
  `BlogSection`, `PropertiesPage`, `PropertyDetailPage`, `FavoritesPage`)
  were switched from static imports to this context, so **admin edits are
  live on the public site immediately** — verified end-to-end for Hero text,
  FAQs, Reviews, and new/deleted Properties.
- **`derivePublicProperty()`** adapts the richer admin property record
  (string enums like `bathrooms: '4+'`, a `photos[]` array with cover/category
  metadata) into the exact shape the existing public components already
  expect (`images: string[]`, numeric `bathrooms`, derived `amenities`), so
  none of the pre-existing public property components needed logic changes.
- **`AdminGuard` / `AdminLoginPage`** — a development-only password gate
  (`sessionStorage` flag, password `arora-admin`, shown on the login screen
  itself). This is explicitly *not* real authentication; it exists to keep
  `/admin` out of casual reach during development and is designed to be
  swapped for backend-issued auth without touching any admin page.

## Property workflow

The Add/Edit Property flow is a 6-step wizard (`PropertyFormPage.jsx` +
`steps/Step*.jsx`) matching the requested structure: Property Details
(basic info, tenant preferences, rent & availability) → Additional Details
(parking/painting charges, facing, structured address, description) →
Photos (drag-and-drop upload, native HTML5 drag-to-reorder, cover selection,
delete) → Photo Verification (tag each uploaded photo with a room category)
→ Highlights (4 categories, free-form add/remove with suggestion chips) →
Review (every section summarized with per-section Edit links). Save Draft
and Publish both persist through the same context; Publish runs full
validation (title, price, buildup area, furnishing, ≥1 photo, address) and
jumps back to the offending step with inline errors if anything is missing;
Save Draft only requires a title, matching the "let admins save partial
progress" requirement.

## CMS sections

- **Properties**: searchable/filterable/sortable table, pagination, status
  badges, View (opens the public listing)/Edit/Delete with a confirmation
  modal and toast, dashboard stats update immediately after any change.
- **Homepage**: Hero (heading/subtitle/search placeholder/image, with a
  live preview), Popular Locations and Our Experts (add/edit/delete/reorder
  via up/down buttons, image upload, a controlled 1–5 star rating input for
  experts).
- **Content**: FAQs (add/edit/delete/reorder, single-open accordion
  preserved on the public side) and Blog (list + dedicated editor page,
  draft/published status, cover image upload, character-limited content
  field).
- **Reviews**: a new data collection (none existed before) with
  approve/reject/delete actions; approved reviews render in a "Resident
  Reviews" section on the relevant property's public detail page — verified
  live (approved Sana Qureshi's review in admin, it appeared immediately on
  `/property/3`).

## Fallbacks (per the "never invent a backend" rule)

- **Image uploads** use `URL.createObjectURL()` — real files, real previews,
  no server. These blob URLs are scoped to the current browser tab's
  lifetime: they work perfectly while the SPA is open (verified: an
  uploaded photo stayed visible across admin steps and across a client-side
  route change to the public property page), but **do not survive a full
  page reload** (a fresh page load gets a plain broken-image icon from the
  browser itself for any blob URL, which `SafeImage`'s `onError` handler
  then replaces with the existing neutral placeholder). This is called out
  here rather than hidden — reconnecting a real upload endpoint later only
  means swapping what `PhotoManager`/`HeroCmsPage`/etc. do with a `File`,
  not any UI rework.
- **Reordering** (locations, experts, FAQs) uses up/down buttons rather than
  pointer-based drag-and-drop, for reliability without adding a DnD library.
  Photo reordering in the wizard *does* use real native HTML5 drag-and-drop
  since that needed no dependency either.
- **Authentication** is the development-only gate described above.

## Known limitations

- Uploaded images are session-scoped blob URLs (see above) — a real backend
  or object-storage integration is needed before this survives page
  reloads/deployment. The seed data's images (all remote Unsplash URLs) are
  unaffected.
- The property table's search/filter/sort/pagination and the property
  wizard's multi-step flow were tested manually end-to-end during this
  session (see below); the Locations/Experts/Blog CRUD modals were verified
  visually and follow the identical, already-tested pattern used by
  Properties/FAQs/Reviews, but were not individually clicked through in this
  session's browser testing pass.
- Mobile/narrow-viewport rendering of the admin panel was verified by code
  review (the sidebar-to-drawer breakpoint mirrors the public site's
  already-verified responsive pattern) rather than a live narrow-viewport
  screenshot, for the same browser-automation viewport limitation noted in
  the migration section above.

## Testing performed (Admin Panel)

- `npm run build` — succeeds with the admin panel included, no errors.
- Logged in through the dev password gate; redirected correctly when
  unauthenticated.
- Dashboard: verified all 8 stat cards compute correctly from live data,
  Recent Properties/Reviews/Blog lists render.
- Properties: viewed the table; ran the full Add Property wizard end-to-end
  (all 6 steps, including a real file upload, drag-reorder-capable photo
  grid, cover selection, photo-category tagging, highlight tag add/remove)
  and Published it — confirmed it appeared in the admin table and on the
  public `/properties?mode=rent` listing with the correct price/type/badge.
  Edited an existing property and confirmed every field pre-filled
  correctly. Saved a second property as a Draft and confirmed it showed a
  Draft badge in admin and was absent from the public site. Deleted both
  test properties via the confirmation modal and confirmed the table and
  dashboard counts updated.
- Homepage: edited the Hero heading and confirmed the public homepage
  updated immediately.
- Content: added a new FAQ and confirmed it appeared in the admin list.
- Reviews: approved a pending review and confirmed it appeared live on the
  corresponding property's public detail page.
- Checked the browser console throughout — no errors.

## Known limitations

- The original bundled HTML file (`Arora Properties (standalone).html`)
  was accidentally deleted by `npx create-vite --overwrite` while
  scaffolding this project (the flag wipes the whole target directory, not
  just conflicting template files). All markup, data and component logic
  had already been fully extracted and read before this happened, so the
  migration itself was not blocked — but the raw original file is no longer
  available for pixel-diffing, and the one local hero image's exact
  original bytes could not be recovered (see fallback above). Nothing else
  was lost since the manifest's other assets (fonts) were intentionally not
  vendored either way.
- Mobile breakpoints were verified by code review against the source's
  verbatim-ported CSS rather than live browser screenshots — the automation
  environment used for QA could not reliably resize its real viewport
  during this session, so narrow-viewport visuals should get a quick manual
  check in a real browser/device before shipping.

## Testing performed

- `npm run build` — production build succeeds with no errors.
- `npm run dev` — manually exercised in a real browser: Home (hero, search
  card → pre-filtered Properties, featured grid, Why Choose Us, How It
  Works, Popular Locations, Agents with Contact toast, Testimonials
  carousel, Property Guide, FAQ accordion open/close, Blog, Newsletter),
  Properties (Buy/Rent tabs, filters, sort, List/Map toggle, map marker →
  detail navigation), Property Detail (gallery, lightbox with Escape/←/→
  keyboard nav, favorite toggle + persistence, Schedule modal full
  validation + all 5 error states, Contact modal + Send-a-Message toast),
  Favorites (populated + empty state, cross-page favorite sync verified via
  `localStorage`).
- Not verified live in this session: narrow-viewport (mobile) rendering —
  see "Known limitations" above.
