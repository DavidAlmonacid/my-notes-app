import { getNotesByCollectionId } from "@/lib/db";
import { Note } from "./note";

export async function Notes({ collectionId }: { collectionId: string }) {
  const notes = await getNotesByCollectionId(collectionId);

  if (notes.length === 0) {
    return;
  }

  return (
    <section className="flex flex-col gap-y-1">
      {notes.map((note) => (
        <Note key={note.id} note={note} collectionId={collectionId} />
      ))}
    </section>
  );
}
