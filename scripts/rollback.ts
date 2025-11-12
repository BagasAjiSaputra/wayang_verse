// scripts/rollback.ts
import { sql } from "drizzle-orm";
import { db } from "../lib/db/index";

async function rollback() {
  await sql`DROP TABLE IF EXISTS wayang CASCADE`;
  await sql`DROP TABLE IF EXISTS users CASCADE`;
  console.log("Rollback selesai!");
}

rollback();