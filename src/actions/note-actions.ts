"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export async function createNote(collectionId: string, formData: FormData) {
  const noteTitle = formData.get("noteTitle")?.toString();

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
