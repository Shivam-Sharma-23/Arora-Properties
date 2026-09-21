# Arora Properties

A real-estate listing web app built with React + Vite, migrated from an original static HTML mockup and extended with a full admin CMS.

## Features

- **Public site**: home page with hero/search, property listings with search/filter/sort, property detail pages with a photo gallery, favorites (persisted locally), agent/location/testimonial/FAQ/blog sections, WhatsApp contact links, and schedule-visit / contact-agent forms.
- **Admin panel** (`/admin`): a dashboard, full property management (multi-step add/edit wizard with photos, highlights, and review step), homepage content management (hero, popular locations, experts), FAQ and blog CMS, and review moderation. Admin edits apply immediately to the public site.

See [`MIGRATION_NOTES.md`](./MIGRATION_NOTES.md) for details on what was ported, what was simplified, and known limitations.

## Getting Started

```bash
npm install
npm run dev
```

The public site runs at the printed local URL; the admin panel is at `/admin` (development-only password gate — see `MIGRATION_NOTES.md` for the password).

## Tech Stack

- React 19 + Vite
- React Router
- Plain CSS (no UI framework) — component-colocated stylesheets plus shared design tokens
- No backend — content is persisted to `localStorage` via a single data-context layer designed to be swapped for a real API later

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint
