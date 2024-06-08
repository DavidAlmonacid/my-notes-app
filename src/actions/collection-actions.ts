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
  const collectionName = formData.get("collectionName") as string;
  const collectionId = formData.get("collectionId") as string;

  if (!collectionName) {
    return;
  }

  /* const query = e.update(e.Collection, () => ({
    filter_single: { id: collectionId },
    set: {
      name: collectionName
    }
  }));

  await query.run(client); */

  revalidatePath("/");
}

export async function deleteCollection(formData: FormData) {
  const collectionId = formData.get("collectionId") as string;

  /* const query = e.delete(e.Collection, () => ({
    filter_single: { id: collectionId }
  }));

  await query.run(client); */

  revalidatePath("/");
}
