"use client";

import { TextCursorInput, Trash } from "lucide-react";
import { useState } from "react";

import { updateNoteTitle } from "@/actions/note-actions";
import type { PartialNote } from "@/types/interfaces";
import { DeleteNoteButton } from "./delete-note-button";
import { Button } from "./ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "./ui/context-menu";
import { Input } from "./ui/input";

interface Props {
  note: PartialNote;
  collectionId: string;
}

export function Note({ note, collectionId }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const renameNoteTitle = updateNoteTitle.bind(null, note.id, note.title);

  const handleRenameNote = () => {
    setIsEditing(true);
  };

  const handleEndRenameNote = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <form action={renameNoteTitle} onSubmit={handleEndRenameNote}>
      <Input
        type="text"
        className="h-fit p-1.5"
        defaultValue={note.title}
        name="noteTitle"
        maxLength={25}
        autoFocus
        onBlur={handleEndRenameNote}
      />
    </form>
  ) : (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          variant="ghost"
          type="button"
          className="justify-start h-9 w-full font-normal focus-visible:ring-offset-0"
        >
          {note.title}
        </Button>
      </ContextMenuTrigger>

      <ContextMenuContent className="flex flex-col gap-y-1.5 p-2 min-w-36">
        <ContextMenuItem className="p-0">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="px-2 py-1.5 h-fit w-full justify-between"
            onClick={handleRenameNote}
          >
            <span>Rename</span>
            <TextCursorInput className="size-5" />
          </Button>
        </ContextMenuItem>

        <ContextMenuItem className="p-0">
          <DeleteNoteButton noteId={note.id} collectionId={collectionId}>
            <span>Delete</span>
            <Trash className="size-5 p-[1px]" />
          </DeleteNoteButton>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
