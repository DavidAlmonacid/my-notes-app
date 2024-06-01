import { createClient } from "edgedb";

import e from "@root/dbschema/edgeql-js";
import { Collection } from "./collection";
import { Notes } from "./notes";

const client = createClient();

export async function Collections() {
  const selectCollections = e.select(e.Collection, (collection) => ({
    id: true,
    name: true,
    order_by: {
      expression: collection.created_at,
      direction: e.ASC
    }
  }));

  const collections = await selectCollections.run(client);

  const selectNotes = e.select(e.Note, (note) => ({
    id: true,
    title: true,
    content: true,
    updated_at: true,
    collection_id: true,
    order_by: {
      expression: note.created_at,
      direction: e.ASC
    }
  }));

  const notes = await selectNotes.run(client);

  return (
    <div className="py-4 text-sm">
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
