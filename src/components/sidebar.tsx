"use client";

import clsx from "clsx";
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
  const [inputLengthError, setInputLengthError] = useState(false);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const collectionNameLength = formData
      .get("collectionName")
      ?.toString()
      .trim().length!;

    if (collectionNameLength > 25) {
      event.preventDefault();
      setInputLengthError(true);
      return;
    }

    handleCloseInput();
    setInputLengthError(false);
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
        <form action={createCollection} onSubmit={handleSubmit}>
          <Input
            type="text"
            name="collectionName"
            placeholder="Collection name"
            className={clsx(
              "px-2.5 py-1.5 mt-3 h-fit bg-input",
              inputLengthError && "focus-visible:ring-destructive"
            )}
            maxLength={25}
            title={
              inputLengthError
                ? "Collection name must be 25 characters or less"
                : ""
            }
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
