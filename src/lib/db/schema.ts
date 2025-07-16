// db/schema.ts

import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  varchar,
  serial,
} from "drizzle-orm/pg-core";

// Users table (assuming you're managing Clerk user IDs or something similar)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(), // Main PK
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull().unique(),
  storageUsed: integer("storage_used").notNull().default(0),
});

export type User = typeof users.$inferSelect;

// Files table
export const files = pgTable("files", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(), // in bytes
  fileType: varchar("file_type", { length: 100 }).notNull(),
  publicId: varchar("public_id", { length: 255 }).notNull(), // Cloudinary ID
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export type File = typeof files.$inferSelect;

// Notes table
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
});

export type Note = typeof notes.$inferSelect;
