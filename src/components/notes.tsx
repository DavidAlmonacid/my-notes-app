"use client";

import { Plus, TextCursorInput, Trash } from "lucide-react";
import { useRef, useState } from "react";

import { createNote } from "@/actions/note-actions";
import type { Note } from "@root/dbschema/interfaces";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "./ui/context-menu";

interface Props {
  collectionId: string;
  notes: Partial<Note>[];
}

export function Notes({ notes, collectionId }: Props) {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const addNoteButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget === addNoteButtonRef.current) {
      event.preventDefault();
    } else {
      handleCloseInput();
    }
  };

  const filteredNotes = notes.filter((note) => {
    return note.collection_id === collectionId;
  });

  return (
    <div className="flex flex-col gap-y-4 py-4 px-7 select-none">
      {showInput && (
        <form action={createNote} onSubmit={handleCloseInput}>
          <input type="hidden" name="collectionId" value={collectionId} />
          <Input
            type="text"
            name="noteTitle"
            placeholder="Note title"
            className="p-1 h-fit bg-input"
            autoFocus
            ref={inputRef}
            onBlur={handleBlur}
          />
        </form>
      )}

      {filteredNotes.length > 0 && (
        <section className="flex flex-col">
          {filteredNotes.map((note) => (
            <ContextMenu key={note.id}>
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
                <ContextMenuItem className="justify-between">
                  <span>Rename</span>
                  <TextCursorInput className="size-5" />
                </ContextMenuItem>
                <ContextMenuItem className="justify-between">
                  <span>Delete</span>
                  <Trash className="size-5 p-[1px]" />
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </section>
      )}

      <Button
        variant="secondary"
        size="sm"
        type="button"
        className="gap-x-5 w-full bg-muted-foreground/25 hover:bg-muted-foreground/40"
        ref={addNoteButtonRef}
        onClick={handleOpenInput}
      >
        <span>Add note</span>
        <Plus className="size-5" />
      </Button>
    </div>
  );
}
