"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export async function createNote(formData: FormData) {
  const noteTitle = formData.get("noteTitle")?.toString();
  const collectionId = formData.get("collectionId") as string;

  if (!noteTitle) {
    return;
  }

  await prisma.note.create({
    data: {
      title: noteTitle,
      collectionId
    }
  });

  revalidatePath("/");
}
