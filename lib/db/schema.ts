// lib/db/schema.ts

import { pgTable, serial, varchar, timestamp, uuid, text } from "drizzle-orm/pg-core";

// Tabel users (sudah ada)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tabel wayang (baru)
export const wayang = pgTable("wayang", {
  id: uuid("id").defaultRandom().primaryKey(),
  nama: varchar("nama", { length: 255 }).notNull(),
  images: text("images").notNull(), // URL gambar
  kisah: text("kisah").notNull(),
});