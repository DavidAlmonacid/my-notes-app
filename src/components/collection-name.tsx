import clsx from "clsx";
import { ChevronRight, TextCursorInput, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import type { Collection } from "@/types/interfaces";
import { DeleteCollectionButton } from "./delete-collection-button";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "./ui/context-menu";

interface Props {
  collection: Collection;
  isOpened: boolean;
  handleRenameCollection: () => void;
}

export function CollectionName({
  collection,
  isOpened,
  handleRenameCollection
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [collectionNotesLength, setCollectionNotesLength] = useState(0);

  useEffect(() => {
    fetch(`/api/collection-notes-count/${collection.id}`)
      .then((response) => response.json())
      .then(({ count }) => setCollectionNotesLength(count));
  });

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex items-center gap-x-0.5">
            <ChevronRight
              className={clsx("w-full max-w-5 h-5", isOpened && "rotate-90")}
            />
            <span>{collection.name}</span>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent className="flex flex-col gap-y-1.5 p-2 min-w-36">
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
            {collectionNotesLength > 0 ? (
              <Button
                variant="destructive"
                size="sm"
                className="px-2 py-1.5 h-fit w-full justify-between bg-destructive/40 hover:bg-destructive/50"
                type="button"
                onClick={handleOpenDialog}
              >
                <span>Delete</span>
                <Trash className="size-5 p-[1px]" />
              </Button>
            ) : (
              <DeleteCollectionButton
                collectionId={collection.id}
                formWidth="w-full"
                className="px-2 py-1.5 h-fit w-full justify-between bg-destructive/40 hover:bg-destructive/50"
                size="sm"
              >
                <span>Delete</span>
                <Trash className="size-5 p-[1px]" />
              </DeleteCollectionButton>
            )}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {isDialogOpen && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Card className="w-[360px] bg-muted/20 border-destructive/70">
            <CardHeader>
              <CardTitle className="text-xl mb-1.5">
                Delete collection
              </CardTitle>

              <CardDescription className="text-xs">
                This action cannot be undone. This will permanently delete your
                collection and all its notes.
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between *:pointer-events-auto">
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="px-4"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>

              <DeleteCollectionButton
                collectionId={collection.id}
                size="sm"
                className="px-4"
              >
                Delete
              </DeleteCollectionButton>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
