import { Collections } from "@/components/collections";
import { NoteContent } from "@/components/note-content";
import { Sidebar } from "@/components/sidebar";
import { NoteIdProvider } from "@/context/note-id-context";

export default function Home() {
  return (
    <main className="flex h-full">
      <NoteIdProvider>
        <Sidebar>
          <Collections />
        </Sidebar>

        <NoteContent />
      </NoteIdProvider>
    </main>
  );
}
