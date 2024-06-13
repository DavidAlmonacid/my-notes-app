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
