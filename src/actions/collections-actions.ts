"use server";

import { createClient } from "edgedb";
import { revalidatePath } from "next/cache";

import e from "@root/dbschema/edgeql-js";

const client = createClient();

export async function createCollection(formData: FormData) {
  const collectionName = formData.get("collectionName") as string;

  if (!collectionName) {
    return;
  }

  const query = e.insert(e.Collection, {
    name: collectionName
  });

  await query.run(client);

  revalidatePath("/");
}
