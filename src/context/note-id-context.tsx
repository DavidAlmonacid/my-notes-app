"use client";

import { createContext, useContext, useState } from "react";

interface NoteIdContextType {
  noteId?: string;
  setNoteId: (noteId: string) => void;
}

export const NoteIdContext = createContext({} as NoteIdContextType);

export function NoteIdProvider({ children }: { children: React.ReactNode }) {
  const [noteId, setNoteId] = useState<string | undefined>(undefined);

  return (
    <NoteIdContext.Provider value={{ noteId, setNoteId }}>
      {children}
    </NoteIdContext.Provider>
  );
}

export function useNoteId() {
  return useContext(NoteIdContext);
}
