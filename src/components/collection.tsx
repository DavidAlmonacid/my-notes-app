"use client";

import type { Collection } from "@prisma/client";
import { useRef, useState } from "react";

import { CollectionName } from "./collection-name";
import { RenameInputCollection } from "./rename-input-collection";

interface Props {
  collection: Pick<Collection, "id" | "name">;
  children: React.ReactNode;
}

export function Collection({ collection, children }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const summaryRef = useRef<HTMLDetailsElement>(null);

  const handleToggle = (event: React.MouseEvent<HTMLDetailsElement>) => {
    setIsOpened(event.currentTarget.open);
  };

  const handleRenameCollection = () => {
    setIsEditing(true);
  };

  const handleEndRenameCollection = () => {
    setIsEditing(false);
  };

  return (
    <details
      className="bg-accent/80 rounded-md select-none"
      onToggle={handleToggle}
    >
      <summary className="appearance-auto p-2" ref={summaryRef}>
        {isEditing ? (
          <RenameInputCollection
            collection={collection}
            endRename={handleEndRenameCollection}
            summaryRef={summaryRef}
          />
        ) : (
          <CollectionName
            collection={collection}
            isOpened={isOpened}
            handleRenameCollection={handleRenameCollection}
          />
        )}
      </summary>

      {children}
    </details>
  );
}
