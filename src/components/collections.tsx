import { createClient } from "edgedb";

import e from "@root/dbschema/edgeql-js";
import { Collection } from "./collection";

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

  return (
    <div className="py-4 text-sm">
      {collections.length === 0 ? (
        <p>No collections found</p>
      ) : (
        <div className="flex flex-col gap-y-2">
          {collections.map((collection) => (
            <Collection key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
