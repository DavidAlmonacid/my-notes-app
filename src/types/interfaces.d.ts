import type { Collection, Note } from "@prisma/client";

export type Collection = Pick<Collection, "id" | "name">;

export type PartialNote = Pick<Note, "id" | "title">;
export type Note = Omit<Note, "createdAt" | "collectionId">;
