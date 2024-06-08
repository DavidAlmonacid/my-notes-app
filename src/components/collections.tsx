import prisma from "@/lib/prisma";
import { Collection } from "./collection";

export async function Collections() {
  // const selectNotes = e.select(e.Note, (note) => ({
  //   id: true,
  //   title: true,
  //   content: true,
  //   updated_at: true,
  //   collection_id: true,
  //   order_by: {
  //     expression: note.created_at,
  //     direction: e.ASC
  //   }
  // }));

  // const notes: Partial<Note>[] = await selectNotes.run(client);

  const collections = await prisma.collection.findMany({
    select: { id: true, name: true },
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="pt-4 text-sm">
      {collections.length === 0 ? (
        <p>No collections found</p>
      ) : (
        <div className="flex flex-col gap-y-2">
          {collections.map((collection) => (
            <Collection key={collection.id} collection={collection}>
              {/* <Notes notes={notes} collectionId={collection.id} /> */}
            </Collection>
          ))}
        </div>
      )}
    </div>
  );
}
