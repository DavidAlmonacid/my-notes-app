"use server";

// import { createClient } from "edgedb";
import { revalidatePath } from "next/cache";

// import e from "@root/dbschema/edgeql-js";

// const client = createClient();

export async function createNote(formData: FormData) {
  const noteTitle = formData.get("noteTitle") as string;
  const collectionId = formData.get("collectionId") as string;

  if (!noteTitle) {
    return;
  }

  /* const query = e.insert(e.Note, {
    title: noteTitle,
    collection_id: collectionId,
    collection: e.select(e.Collection, () => ({
      filter_single: { id: collectionId }
    }))
  });

  await query.run(client); */

  revalidatePath("/");
}
