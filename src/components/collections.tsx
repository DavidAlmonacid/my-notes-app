import prisma from "@/lib/prisma";
import { Collection } from "./collection";
import { Notes } from "./notes";

export async function Collections() {
  const collections = await prisma.collection.findMany({
    select: { id: true, name: true },
    orderBy: { createdAt: "asc" }
  });

  const notes = await prisma.note.findMany({
    select: { id: true, title: true, collectionId: true },
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
              <Notes notes={notes} collectionId={collection.id} />
            </Collection>
          ))}
        </div>
      )}
    </div>
  );
}
