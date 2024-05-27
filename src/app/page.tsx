import { Collections } from "@/components/collections";

export default function Home() {
  return (
    <main className="flex h-full">
      <Collections />

      <div className="grow">Monaco Editor</div>
    </main>
  );
}
