"use client";

import { Plus } from "lucide-react";
import { useRef, useState } from "react";

import { createCollection } from "@/actions/collection-actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  children: React.ReactNode;
}

export function Sidebar({ children }: Props) {
  const [showInput, setShowInput] = useState(false);
  const plusButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenInput = () => {
    if (!showInput) {
      setShowInput(true);
    } else {
      inputRef.current?.focus();
    }
  };

  const handleCloseInput = () => {
    setShowInput(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget === plusButtonRef.current) {
      event.preventDefault();
    } else {
      handleCloseInput();
    }
  };

  return (
    <section className="w-64 h-[calc(100vh-61px)] border-r border-r-white/15 px-4 pb-6 overflow-auto">
      <h2 className="sticky top-0 flex items-center justify-around w-full py-4 bg-background text-lg font-medium z-10">
        <span>Collections</span>

        <Button
          variant="outline"
          size="icon"
          type="button"
          className="size-fit p-1"
          title="Create a new collection"
          ref={plusButtonRef}
          onClick={handleOpenInput}
        >
          <Plus className="size-5" />
        </Button>
      </h2>

      {showInput && (
        <form action={createCollection} onSubmit={handleCloseInput}>
          <Input
            type="text"
            name="collectionName"
            placeholder="Collection name"
            className="px-2.5 py-1.5 mt-3 h-fit bg-input"
            autoFocus
            ref={inputRef}
            onBlur={handleBlur}
          />
        </form>
      )}

      {children}
    </section>
  );
}
