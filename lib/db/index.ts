// lib/db/index.ts


import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Buat koneksi ke Supabase PostgreSQL
const client = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// Ekspor DB agar bisa dipakai di route API
export const db = drizzle(client, { schema });
