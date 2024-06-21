"use client";

import { fontMono } from "@/app/fonts";
import { useNoteId } from "@/context/note-id-context";
import { cn } from "@/lib/utils";
import type { Note } from "@prisma/client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function NoteContent() {
  const [note, setNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");

  const { noteId } = useNoteId();

  useEffect(() => {
    if (!noteId) {
      setNote(null);
      return;
    }

    fetch(`/api/get-note/${noteId}`)
      .then((response) => response.json())
      .then(({ note }) => {
        setNote(note);
        setNoteTitle(note.title);
      });
  }, [noteId]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value);

    fetch(`/api/update-note-title/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: event.target.value })
    });
  };

  return !note ? (
    <div className="grow px-10 py-5 font-mono text-center">
      Select a note to view its content
    </div>
  ) : (
    <div
      className={cn(
        "flex flex-col grow max-w-[75ch] px-10 py-5 font-mono",
        fontMono.variable
      )}
    >
      <div>
        <Input
          aria-label="Note title"
          value={noteTitle}
          className="text-xl border-0 focus-visible:ring-0"
          onChange={handleTitleChange}
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

      <Textarea
        // value={note?.content}
        defaultValue={note?.content}
        placeholder="Note content"
        className="grow mt-9 mb-2 resize-none focus-visible:ring-0"
      />
    </div>
  );
}
