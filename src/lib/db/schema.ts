// db/schema.ts

import {
  pgTable,
  text,
  timestamp,
  integer,
  varchar,
  serial,
} from "drizzle-orm/pg-core";

// Files table
export const files = pgTable("files", {
  id: serial("id").primaryKey(),
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
