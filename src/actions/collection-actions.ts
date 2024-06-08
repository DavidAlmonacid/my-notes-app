"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export async function createCollection(formData: FormData) {
  const collectionName = formData.get("collectionName")?.toString();

  if (!collectionName) {
    return;
  }

  await prisma.collection.create({
    data: {
      name: collectionName
    }
  });

  revalidatePath("/");
}

export async function updateCollectionName(formData: FormData) {
  const collectionName = formData.get("collectionName")?.toString();
  const collectionId = formData.get("collectionId") as string;

  if (!collectionName) {
    return;
  }

  await prisma.collection.update({
    where: { id: collectionId },
    data: { name: collectionName }
  });

  revalidatePath("/");
}

export async function deleteCollection(formData: FormData) {
  const collectionId = formData.get("collectionId") as string;

  await prisma.collection.delete({ where: { id: collectionId } });

  revalidatePath("/");
}
