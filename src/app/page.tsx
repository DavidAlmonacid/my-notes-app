import { Collections } from "@/components/collections";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <main className="flex h-full">
      <Sidebar>
        <Collections />
      </Sidebar>

      <div className="grow">Note content</div>
    </main>
  );
}
