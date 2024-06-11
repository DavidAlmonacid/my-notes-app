import { deleteCollection } from "@/actions/collection-actions";
import { Button } from "./ui/button";

interface Props {
  collectionId: string;
  children: React.ReactNode;
}

export function DeleteCollectionButton({ collectionId, children }: Props) {
  return (
    <form action={deleteCollection} className="w-full">
      <input type="hidden" name="collectionId" value={collectionId} />
      <Button
        variant="destructive"
        size="sm"
        className="px-2 py-1.5 h-fit w-full justify-between bg-destructive/40 hover:bg-destructive/50"
        type="submit"
      >
        {children}
      </Button>
    </form>
  );
}
