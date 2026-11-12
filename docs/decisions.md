# decisions

Newest first. Each entry: what was decided, and why.

## 2026-11-12: create a group (H1)

- **Only the owner link can create groups** (product owner's call): `/new` checks the owner cookie; any other
  device gets "link not found". The app home will hide "create a group" for those devices (step 4).
- **PINs are stored readable**, in `members.pin`, not as a hash: the host's PIN list (H2) has to show them.
  Only server code returns them, and only to a device that may manage the group. Replaces the scrypt hash.
- **Pets can be shared; pet names are unique per group** (product decision "pets are shared"). The unique index
  moved from `pet` to `pet_name`.
- **Pet names, v1:** the 10 from the prototype (bánh bao, mochi, xôi, bơ, cốm, kem, mít, na, su, tép). The product
  owner will grow the list to 30+ later.
- **The group is saved when step 2 of create group continues**, so step 3 shows a real PIN. Going back and
  continuing again updates the same group and keeps the PIN.
- **Gift day "not in the past"**: the browser checks the device's own today; the server only refuses a day that
  is over everywhere on earth, since it doesn't know the host's time zone.
- **Prototype sizes without a boo token** (6, 12, 16, 18 px spacing, the 440px column, the 36px PIN) are named once
  in `src/app/globals.css`. Candidates to add to the design system.

## 2026-11-12: prototype in the repo

- The approved design ("secret santa mockup" canvas, page "prototype · pass 2" plus "night kit") is copied byte
  for byte into `prototype/`, so cloud sessions can read it. It's the spec: screens match it exactly. The older
  "explorations" page is left out on purpose, so no one builds an outdated option.

## 2026-11-12: notion permissions

- `.claude/settings.json` lets Claude search, read, edit and create Notion pages without an "allow" prompt, so the product owner's project docs can be updated on request. Deleting, moving and sharing pages still ask. The rule only applies in sessions that have just this repo.

## 2026-11-12: pull request size

- Trial: each user story is split into a few small pull requests, planned up front, instead of one PR per story. The product owner wanted to follow progress step by step. Half-built features stay unlinked on the live site until the story's last PR. To revisit after the first few stories.

## 2026-11-12: wordmark

- Every screen carries the `Wordmark` top-left with the word "secret santa" (from `copy.wordmark`), linking home, as the design system says. The setup brief's "skip Wordmark" is superseded.
- The card's pip is a pixel gift (gold box, berry ribbon), not the design system's paw, as in the prototype
  (`Wordmark mark="gift"`).

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
