import prisma from "@/lib/prisma";
import { Collection } from "./collection";
import { Notes } from "./notes";
import { NotesSection } from "./notes-section";

export async function Collections() {
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
              <NotesSection collectionId={collection.id}>
                <Notes collectionId={collection.id} />
              </NotesSection>
            </Collection>
          ))}
        </div>
      )}
    </div>
  );
}
