"use client";

import type { Collection } from "@prisma/client";
import { useRef } from "react";

import { updateCollectionName } from "@/actions/collection-actions";
import { Input } from "./ui/input";

interface Props {
  collection: Pick<Collection, "id" | "name">;
  endRename: () => void;
  summaryRef: React.RefObject<HTMLDetailsElement>;
}

export function RenameInputCollection({
  collection,
  endRename,
  summaryRef
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget !== summaryRef.current) {
      endRename();
      return;
    }

    inputRef.current?.focus();
  };

  return (
    <form action={updateCollectionName} onSubmit={endRename}>
      <input type="hidden" value={collection.id} name="collectionId" />
      <input
        type="hidden"
        value={collection.name}
        name="currentCollectionName"
      />
      <Input
        type="text"
        className="h-fit p-0.5"
        defaultValue={collection.name}
        name="collectionName"
        autoFocus
        ref={inputRef}
        onBlur={handleBlur}
      />
    </form>
  );
}
