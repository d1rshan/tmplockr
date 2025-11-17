import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  index,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(), // hashed password btw
  storageUsed: integer("storage_used").default(0).notNull(),
  notesUsed: integer("notes_used").default(0).notNull(),
});


export const filesTable = pgTable(
  "files",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
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

export type File = typeof filesTable.$inferInsert;

export const notesTable = pgTable(
  "notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
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

export type Note = typeof notesTable.$inferSelect;

export const codesTable = pgTable(
  "codes",
  {
    code: integer("code").primaryKey(),
    userId: uuid("user_id").references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  },
  (t) => [index("codes_user_id_index").on(t.userId)]
);

export const sharedFilesNotesTable = pgTable(
  "shared_files_notes",
  {
    code: integer("code").references(() => codesTable.code, {
      onDelete: "cascade",
    }),
    file_id: uuid("file_id").references(() => filesTable.id, {
      onDelete: "cascade",
    }),
    note_id: uuid("note_id").references(() => notesTable.id, {
      onDelete: "cascade",
    }),
  },
  (t) => [index("shared_files_notes_code_index").on(t.code)]
);
