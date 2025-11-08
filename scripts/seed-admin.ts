// scripts/seed-admin.ts
import "dotenv/config"; // <- wajib paling atas agar .env dibaca
import { db } from "../lib/db/index";
import { users } from "../lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  try {
    const email = "admin@gmail.com";
    const name = "Admin";
    const password = "wayang123";

    // cek apakah sudah ada
    const existing = await db.select().from(users).where(eq(users.email, email));

    if (existing.length > 0) {
      console.log("ℹ️ Admin sudah ada, skip seeding.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin berhasil dibuat!");
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
  } finally {
    process.exit(0);
  }
}

seedAdmin();
