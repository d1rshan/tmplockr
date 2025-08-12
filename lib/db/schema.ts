import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  index,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  storageUsed: integer("storage_used").default(0).notNull(),
  notesUsed: integer("notes_used").default(0).notNull(),
});

export const filesTable = pgTable(
  "files",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .references(() => usersTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),
    imagekitUrl: text("imagekit_url").notNull(),
    imagekitId: text("imagekit_id").notNull(),
    uploadedAt: timestamp("uploaded_at").defaultNow(),
  },
  (t) => [index("files_user_id_index").on(t.userId)]
);

export type FileInsert = typeof filesTable.$inferInsert;
export type FileSelect = typeof filesTable.$inferSelect;

export const notesTable = pgTable(
  "notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .references(() => usersTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("notes_user_id_index").on(t.userId)]
);
