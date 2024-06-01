"use client";

import clsx from "clsx";
import { ChevronRight, EllipsisVertical } from "lucide-react";
import { useState } from "react";

import type { Collection } from "@root/dbschema/interfaces";
import { DeleteCollectionButton } from "./delete-collection-button";
import { RenameInputCollection } from "./rename-input-collection";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Props {
  collection: Pick<Collection, "id" | "name">;
  children: React.ReactNode;
}

export function Collection({ collection, children }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    <details className="bg-accent/80 rounded-md" onToggle={handleToggle}>
      <summary className="appearance-auto">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-x-0.5 pr-1">
            <ChevronRight
              className={clsx("w-full max-w-5 h-5", isOpened && "rotate-90")}
            />
            {isEditing ? (
              <RenameInputCollection
                collection={collection}
                endRename={handleEndRenameCollection}
              />
            ) : (
              <span>{collection.name}</span>
            )}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="size-fit p-0.5"
                title="Options"
              >
                <EllipsisVertical className="size-5" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-fit p-3">
              <section className="flex flex-col gap-y-2 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={handleRenameCollection}
                >
                  Rename
                </Button>

                <DeleteCollectionButton collectionId={collection.id}>
                  Delete
                </DeleteCollectionButton>
              </section>
            </PopoverContent>
          </Popover>
        </div>
      </summary>

      {children}
    </details>
  );
}
