"use client";

import type { Collection } from "@prisma/client";
import clsx from "clsx";
import { ChevronRight, TextCursorInput, Trash } from "lucide-react";
import { useRef, useState } from "react";

import { DeleteCollectionButton } from "./delete-collection-button";
import { RenameInputCollection } from "./rename-input-collection";
import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "./ui/context-menu";

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
          <ContextMenu>
            <ContextMenuTrigger>
              <div className="flex items-center gap-x-0.5">
                <ChevronRight
                  className={clsx(
                    "w-full max-w-5 h-5",
                    isOpened && "rotate-90"
                  )}
                />
                <span>{collection.name}</span>
              </div>
            </ContextMenuTrigger>

            <ContextMenuContent className="p-2 min-w-36">
              <ContextMenuItem className="p-0">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="px-2 py-1.5 h-fit w-full justify-between"
                  onClick={handleRenameCollection}
                >
                  <span>Rename</span>
                  <TextCursorInput className="size-5" />
                </Button>
              </ContextMenuItem>

              <ContextMenuItem className="p-0">
                <DeleteCollectionButton collectionId={collection.id}>
                  <span>Delete</span>
                  <Trash className="size-5 p-[1px]" />
                </DeleteCollectionButton>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )}
      </summary>

      {children}
    </details>
  );
}
