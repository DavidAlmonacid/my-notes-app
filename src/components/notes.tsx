import prisma from "@/lib/prisma";
import { Note } from "./note";

export async function Notes({ collectionId }: { collectionId: string }) {
  const notes = await prisma.note.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "asc" },
    where: { collectionId }
  });

  if (notes.length === 0) {
    return;
  }

  return (
    <section className="flex flex-col">
      {notes.map((note) => (
        <Note key={note.id} title={note.title} />
      ))}
    </section>
  );
}
