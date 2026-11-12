import { defineConfig } from "drizzle-kit";

// `npm run db:generate` only reads the schema: it needs no database.
export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  strict: true,
});
