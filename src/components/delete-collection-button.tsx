import { deleteCollection } from "@/actions/collection-actions";
import { Button } from "./ui/button";

interface Props {
  collectionId: string;
  children: React.ReactNode;
}

export function DeleteCollectionButton({ collectionId, children }: Props) {
  return (
    <form action={deleteCollection}>
      <input type="hidden" name="collectionId" value={collectionId} />
      <Button variant="destructive" size="sm" className="w-full" type="submit">
        {children}
      </Button>
    </form>
  );
}
