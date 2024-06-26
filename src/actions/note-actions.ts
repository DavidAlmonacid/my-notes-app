"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

export async function createNote(collectionId: string, formData: FormData) {
  const noteTitle = formData.get("noteTitle")?.toString().trim();

  if (!noteTitle || noteTitle.length > 35) {
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

export async function updateNoteTitle(
  noteId: string,
  currentNoteTitle: string,
  formData: FormData
) {
  const noteTitle = formData.get("noteTitle")?.toString().trim();

  if (!noteTitle || noteTitle === currentNoteTitle || noteTitle.length > 35) {
    return;
  }

  await prisma.note.update({
    where: { id: noteId },
    data: { title: noteTitle }
  });

  revalidatePath("/");
}

export async function deleteNote(formData: FormData) {
  const noteId = formData.get("noteId") as string;
  const collectionId = formData.get("collectionId") as string;

  const note = await prisma.note.findUnique({ where: { id: noteId } });

  if (!note) {
    return;
  }

  if (note.collectionId === collectionId) {
    await prisma.note.delete({ where: { id: noteId } });
  } else {
    return;
  }

  revalidatePath("/");
}
