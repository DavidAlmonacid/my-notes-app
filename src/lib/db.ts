import prisma from "@/lib/prisma";
import type { Collection, PartialNote } from "@/types/interfaces";

export async function getCollections(): Promise<Collection[]> {
  return await prisma.collection.findMany({
    select: { id: true, name: true },
    orderBy: { createdAt: "asc" }
  });
}

export async function getNotesByCollectionId(
  collectionId: string
): Promise<PartialNote[]> {
  return await prisma.note.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "asc" },
    where: { collectionId }
  });
}
