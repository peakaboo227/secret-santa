# secret santa

A Secret Santa for friends. Each group gets one game link. Friends join without an account by picking
their name, entering a 4-digit PIN and choosing a pixel pet.

## Where things are

- Live app: the `vercel.app` link on the project's page in Vercel.
- Code rules for Claude: [CLAUDE.md](CLAUDE.md)
- Decisions and open questions: [docs/decisions.md](docs/decisions.md)
- Design system: [design-system/README.md](design-system/README.md)
- All UI text: [src/copy.ts](src/copy.ts)

## The owner link (your backup key)

The owner link lets any device you open it on manage every group. It never lets that device play
or see secrets.

The link is: `<your app address>/owner/<OWNER_LINK_SECRET>`

To find the secret: Vercel, your project, **Settings**, **Environment Variables**, `OWNER_LINK_SECRET`,
then click the eye icon to show the value. Don't share the link: anyone with it can manage every group.

## Running it on a laptop

```bash
npm install
cp .env.example .env.local   # or: vercel env pull .env.local
npm run dev
```

The app builds and its tests run without a database: `npm run build`, `npm test`.
