import { deleteNote } from "@/actions/note-actions";
import { useNoteId } from "@/context/note-id-context";
import { Button } from "./ui/button";

interface Props {
  noteId: string;
  collectionId: string;
  children: React.ReactNode;
}

export function DeleteNoteButton({ noteId, collectionId, children }: Props) {
  const { noteId: currentNoteId, setNoteId } = useNoteId();

  const handleClick = () => {
    if (currentNoteId === noteId) {
      setNoteId(null);
    }
  };

  return (
    <form action={deleteNote} className="w-full">
      <input type="hidden" name="noteId" value={noteId} />
      <input type="hidden" name="collectionId" value={collectionId} />
      <Button
        variant="destructive"
        size="sm"
        className="px-2 py-1.5 h-fit w-full justify-between bg-destructive/40 hover:bg-destructive/50"
        onClick={handleClick}
        type="submit"
      >
        {children}
      </Button>
    </form>
  );
}
