import { createClient } from "edgedb";
import { Plus } from "lucide-react";

import e from "@root/dbschema/edgeql-js";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const client = createClient();

export async function Collections() {
  const selectCollections = e.select(e.Collection, () => ({
    id: true,
    name: true
  }));

  const collections = await selectCollections.run(client);

  return (
    <section className="w-64 border-r border-r-white/15 py-6 px-4">
      <h2 className="flex justify-around py-4 text-lg font-medium">
        <span>Collections</span>

        <Button
          variant="ghost"
          size="icon"
          className="border border-white rounded-md size-6"
        >
          <Plus width={20} />
        </Button>
      </h2>

      {collections && collections.length === 0 ? (
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
    </section>
  );
}
