import { TextCursorInput, Trash } from "lucide-react";

import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "./ui/context-menu";

interface Props {
  // note: Partial<Note>;
}

export function Note({ note }: Props) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          variant="ghost"
          type="button"
          className="justify-start h-9 w-full"
        >
          {note.title}
        </Button>
      </ContextMenuTrigger>

      <ContextMenuContent className="p-2 min-w-36">
        <ContextMenuItem className="p-0">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="px-2 py-1.5 h-fit w-full justify-between"
          >
            <span>Rename</span>
            <TextCursorInput className="size-5" />
          </Button>
        </ContextMenuItem>

        <ContextMenuItem className="p-0">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="px-2 py-1.5 h-fit w-full justify-between"
          >
            <span>Delete</span>
            <Trash className="size-5 p-[1px]" />
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

/* module default {
  type Collection {
    required name: str;
    required created_at: datetime {
      default := (datetime_current());
      readonly := true;
    };
    required updated_at: datetime {
      default := (datetime_current());
    };
  }

  type Note {
    required title: str;
    required content: str {
      default := "";
    };
    required created_at: datetime {
      default := (datetime_current());
      readonly := true;
    };
    required updated_at: datetime {
      default := (datetime_current());
    };
    required collection_id: str;
    required collection: Collection;
  }
} */
