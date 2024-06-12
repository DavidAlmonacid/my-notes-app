import clsx from "clsx";
import { ChevronRight, TextCursorInput, Trash } from "lucide-react";

import type { Collection } from "@/types/interfaces";
import { DeleteCollectionButton } from "./delete-collection-button";
import { Button } from "./ui/button";
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
  return (
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
          <DeleteCollectionButton collectionId={collection.id}>
            <span>Delete</span>
            <Trash className="size-5 p-[1px]" />
          </DeleteCollectionButton>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
