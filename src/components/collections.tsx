import { createClient } from "edgedb";
import e from "@root/dbschema/edgeql-js";

const client = createClient();

export async function Collections() {
  const selectCollections = e.select(e.Collection, () => ({
    id: true,
    name: true
  }));

  const collections = await selectCollections.run(client);

  return (
    <div className="py-4 text-sm">
      {collections.length === 0 ? (
        <p>No collections found</p>
      ) : (
        <ul>
          {collections.map((collection) => (
            <li key={collection.id} className="py-2">
              {collection.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
