import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const collections = pgTable("collections", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  name: varchar("name", { length: 25 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const notes = pgTable("notes", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: varchar("title", { length: 25 }).notNull(),
  content: text("content").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  collectionId: uuid("collection_id").references(() => collections.id)
});
