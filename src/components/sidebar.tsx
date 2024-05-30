"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { createCollection } from "@/actions/collections-actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  children: React.ReactNode;
}

export function Sidebar({ children }: Props) {
  const [showInput, setShowInput] = useState(false);

  return (
    <section className="w-64 border-r border-r-white/15 py-6 px-4">
      <h2 className="flex justify-around py-4 text-lg font-medium">
        <span>Collections</span>

        <Button
          variant="ghost"
          size="icon"
          className="border border-white rounded-md size-6"
          title="Create a new collection"
          onClick={() => setShowInput(true)}
        >
          <Plus width={20} />
        </Button>
      </h2>

      {showInput && (
        <form action={createCollection} onSubmit={() => setShowInput(false)}>
          <Input
            type="text"
            name="collectionName"
            placeholder="Collection name"
            className="px-2.5 py-1 mt-3 h-fit"
            autoFocus
            onBlur={() => setShowInput(false)}
          />
        </form>
      )}

      {children}
    </section>
  );
}
