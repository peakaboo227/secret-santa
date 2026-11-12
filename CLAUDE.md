# secret santa

A Secret Santa web app for about 10 friends, launching 2 Dec 2026. The product owner is not a developer:
explain what you did in plain words, and stop to ask when a product decision is needed.

@AGENTS.md

## Rules for every session

- **Never push to main.** Always work on a branch and open a pull request. The product owner reviews
  each one on the Vercel preview link and merges it. (GitHub's free plan can't enforce this on a private
  repo, so this rule is what keeps the review step in place.)
- **Split each user story into a few small pull requests** (trial for the first few stories; the product
  owner may change it). Before coding a story, post a short numbered plan of its PRs and wait for an OK.
  Each PR is one meaningful step a person can see or check on the Vercel preview (for example: the
  database table, then the page, then the link to it). Not too small: never a PR for a single tweak that
  can't be checked on its own. Each PR must leave the app working, and a half-built feature stays out of
  reach on the live site (not linked from any screen) until its last PR. Name PRs "story: step n of m".
  Small, focused PRs are quicker to review on a phone and easier to undo.
- **The browser never talks to the database.** All data access goes through server-only code
  (`import "server-only"`) that first checks who the device is (`src/server/access.ts`) and what that role
  may see, and returns only those fields. Never send a whole row to the browser.
- **Privacy is enforced on the server, not just hidden in the UI:**
  - the host never sees pets or pairings until the gift exchange starts (`groups.exchange_started_at`);
  - a giver sees only their giftee's pet, pet name and wishlist, never their real name;
  - the owner link (`OWNER_LINK_SECRET`) gives manage access to every group, never player access.
- **Match the prototype exactly.** `prototype/` holds the product owner's approved design for every screen
  (`prototype/README.md` lists them and says how to read them). Build each screen to match it: same text,
  layout, spacing, colours, icons and states. Don't redesign, reword or "improve" it. If something can't be
  built as designed, or a screen isn't in the prototype, stop and ask. Never edit `prototype/` except to
  re-copy it from the design canvas.
  One agreed difference: where the prototype's text says "pet" or "pet name", the app says "character" or
  "character name" (see `docs/decisions.md`). Code and database names keep "pet".
- **Design system first.** It lives in `design-system/` (the boo design system, `christmas-night` theme,
  dark only). Read `design-system/README.md` first, and each component's README before using it.
  Use the typed components in `src/components/boo`. Colours, spacing, radius and type only through
  its tokens (`var(--…)` and the type classes like `.headline`), never hardcoded values.
  After updating `design-system/`, run `npm run ds:sync`.
- **All UI text lives in `src/copy.ts`**, referenced by key: labels, buttons, headings, messages,
  placeholders, errors. All lowercase. No translation library. A test checks the lowercase rule.
- **Nothing hardcoded:** keys and URLs come from environment variables (see `.env.example`).
- **Build and tests work offline:** no network beyond npm and no database. No Google Fonts or other
  downloads at build time; fonts come from npm (Fontsource). Never read `DATABASE_URL` at import time.

## How things work

- Next.js 16 (App Router, Cache Components on) + TypeScript + React 19, on Vercel Hobby, region Singapore (`sin1`).
- Neon Postgres through Drizzle ORM. Schema: `src/server/db/schema.ts`. Groups are the root; every other
  table belongs to a group.
- **Database changes:** edit the schema, run `npm run db:generate`, commit the new file in `drizzle/`.
  Never use `drizzle-kit push`. Migrations run automatically in the Vercel build (`vercel-build` script):
  production migrates the production database, previews migrate the `dev` branch. Cloud sessions never
  need a database key.
- No realtime: pages read fresh data when they load.

## Commands

- `npm run dev`: local app at http://localhost:3000
- `npm test`: Vitest
- `npm run lint`, `npm run typecheck`
- `npm run build`: production build (no database needed)

Before opening a PR, run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`.
