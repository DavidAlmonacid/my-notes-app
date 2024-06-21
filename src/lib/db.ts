import prisma from "@/lib/prisma";
import type { Collection, PartialNote } from "@/types/interfaces";

export async function getCollections() {
  const collections: Collection[] = await prisma.collection.findMany({
    select: { id: true, name: true },
    orderBy: { createdAt: "asc" }
  });

  return collections;
}

export async function getNotesByCollectionId(collectionId: string) {
  const notes: PartialNote[] = await prisma.note.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "asc" },
    where: { collectionId }
  });

  return notes;
}

export async function getNotesLengthByCollectionId(collectionId: string) {
  return await prisma.note.count({ where: { collectionId } });
}

export async function getNoteById(noteId: string) {
  return await prisma.note.findUnique({
    where: { id: noteId }
  });
}

export async function updateNoteTitle(noteId: string, title: string) {
  return await prisma.note.update({
    where: { id: noteId },
    data: { title }
  });
}
