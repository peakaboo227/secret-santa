# decisions

Newest first. Each entry: what was decided, and why.

## 2026-11-12: wordmark

- Every screen carries the `Wordmark` top-left with the word "secret santa" (from `copy.wordmark`), linking home, as the design system says. The setup brief's "skip Wordmark" is superseded.

## 2026-11-12: project setup

- **Stack:** Next.js 16.4 (App Router) + React 19.3 + TypeScript on Vercel Hobby; Neon Postgres (free) with
  Drizzle ORM and SQL migrations; Vitest. No realtime. Zero budget, free tiers only.
- **Region:** Vercel functions in Singapore (`sin1`, set in `vercel.json`). The Neon database should be in
  Singapore too (AWS ap-southeast-1); otherwise every page pays a round trip between regions.
- **Migrations run only in the Vercel build** (`vercel-build` script runs `scripts/migrate.mjs` and then
  `next build`). Each Vercel environment has its own `DATABASE_URL`: Production gets the main database,
  Preview and Development get the Neon `dev` branch. Local `npm run build` and tests never touch a database,
  so cloud sessions never need a database key.
- **Fonts from npm (Fontsource)**, not Google: Be Vietnam Pro 700, Merriweather Sans 400/700, Inter 400/700,
  Barlow 400, all with their Vietnamese files. The design system's `bundle.css` starts with a Google Fonts
  `@import`; `npm run ds:sync` copies it to `src/styles/boo-components.css` without that line, and a test
  keeps the two in sync.
- **Design system components** are ported from `design-system/components/bundle.js` to typed React 19
  components in `src/components/boo`. The `Cover` folder has no component (it's the design system's own
  cover card), so it isn't ported.
- **Device sessions:** a random token in an httpOnly cookie (`ss_device`); the database stores only its
  SHA-256 hash. PINs are stored as scrypt hashes. Members have failed-attempt and lockout fields.
- **Owner link:** `/owner/<OWNER_LINK_SECRET>` sets an httpOnly `ss_owner` cookie holding an HMAC of the secret
  (not the secret itself). It grants manage access to every group, never player access. A wrong key returns 404.
- **Schema assumptions** (easy to change in a later PR, since nothing is live yet):
  - `groups.stage` (setup, joining, drawn, exchange, revealed) and `groups.exchange_started_at` drive privacy.
  - `groups.game_code` is the random part of the game link.
  - `groups.budget` is free text ("200k", "about 10 euro").
  - The host is a member with `is_host`; `playing = false` keeps someone on the list but out of the draw.
  - Santa status lives on the pairing row (one per giver).
  - The exchange board has one row per receiver, in hand-out order: outcome (waiting, handed, skipped) and
    the receiver's guess of who their santa was.
  - Reveal progress is one row per group: how many santas have been unmasked.
  - Pets are unique within a group.

## open questions

- **Landing copy:** the design system says "no pitch copy on the landing". The placeholder home has one
  functional line ("open the game link your host sent you"). Revisit when the real home is designed.
