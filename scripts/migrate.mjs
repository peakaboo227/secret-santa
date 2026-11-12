// Applies the SQL migrations in drizzle/ to the database in DATABASE_URL.
// Runs automatically on Vercel through the "vercel-build" script, so each environment
// migrates its own database: Production -> the main database, Preview -> the dev branch.
// Local builds (`npm run build`) and tests never run this and never need a database.
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";

// Prefer the direct (unpooled) connection for migrations when Vercel provides one.
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error(
    "migrate: DATABASE_URL is not set for this environment.\n" +
      "Connect the Neon database in Vercel (Storage) for Production, and set the dev branch's DATABASE_URL for Preview.",
  );
  process.exit(1);
}

const env = process.env.VERCEL_ENV || "local";
const host = new URL(url).host;
console.log(`migrate: applying drizzle/ migrations (${env}) to ${host}`);

const pool = new Pool({ connectionString: url });
try {
  await migrate(drizzle(pool), { migrationsFolder: "drizzle" });
  console.log("migrate: done");
} catch (error) {
  console.error("migrate: failed", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
