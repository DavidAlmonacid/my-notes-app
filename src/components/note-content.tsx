"use client";

import { fontMono } from "@/app/fonts";
import { useNoteId } from "@/context/note-id-context";
import { cn } from "@/lib/utils";
import type { Note } from "@prisma/client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

export function NoteContent() {
  const [note, setNote] = useState<Note | null>(null);
  const { noteId } = useNoteId();

  useEffect(() => {
    if (!noteId) {
      setNote(null);
      return;
    }

    fetch(`/api/get-note/${noteId}`)
      .then((response) => response.json())
      .then(({ note }) => setNote(note));
  }, [noteId]);

  return !note ? (
    <div className="grow px-10 py-5 font-mono text-center">
      Select a note to view its content
    </div>
  ) : (
    <div className={cn("grow px-10 py-5 font-mono", fontMono.variable)}>
      <Input
        aria-label="Note title"
        value={note?.title}
        className="text-xl border-0 focus-visible:ring-0"
      />
      <hr />
      <span className="text-[13px] opacity-80 block mt-2">
        Last update -{" "}
        {Intl.DateTimeFormat("en-US", {
          dateStyle: "full",
          timeStyle: "medium",
          hour12: false
        }).format(new Date(note?.updatedAt || 0))}
      </span>
    </div>
  );
}
