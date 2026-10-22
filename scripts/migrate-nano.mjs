// Applies db/nano/*.sql. Migrations use the direct (unpooled) connection when available.
// Usage: npm run db:migrate
import { readdir, readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}
const sql = neon(url);
const dir = new URL("../db/nano/", import.meta.url);
for (const file of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) {
  const text = await readFile(new URL(file, dir), "utf8");
  for (const statement of text.split(/;\s*$/m).map((s) => s.trim()).filter(Boolean)) {
    await sql.query(statement);
  }
  console.log(`applied ${file}`);
}
