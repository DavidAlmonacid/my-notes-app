import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export function Collections() {
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
    </section>
  );
}
