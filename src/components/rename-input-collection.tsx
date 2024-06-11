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

  const renameCollectionName = updateCollectionName.bind(
    null,
    collection.id,
    collection.name
  );

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget !== summaryRef.current) {
      endRename();
      return;
    }

    inputRef.current?.focus();
  };

  return (
    <form action={renameCollectionName} onSubmit={endRename}>
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
