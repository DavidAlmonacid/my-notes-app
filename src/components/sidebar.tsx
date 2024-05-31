"use client";

import { Plus } from "lucide-react";
import { useRef, useState } from "react";

import { createCollection } from "@/actions/collections-actions";
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
    <section className="w-64 border-r border-r-white/15 py-6 px-4">
      <h2 className="flex items-center justify-around py-4 text-lg font-medium">
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
            className="px-2.5 py-1 mt-3 h-fit bg-input"
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
