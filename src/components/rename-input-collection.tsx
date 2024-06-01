import { updateCollectionName } from "@/actions/collection-actions";
import { Input } from "./ui/input";

interface Props {
  collection: {
    id: string;
    name: string;
  };
  endRename: () => void;
}

export function RenameInputCollection({ collection, endRename }: Props) {
  return (
    <form action={updateCollectionName} onSubmit={endRename}>
      <input type="hidden" value={collection.id} name="collectionId" />
      <Input
        type="text"
        className="h-fit p-0.5"
        defaultValue={collection.name}
        name="collectionName"
        required
        autoFocus
        onBlur={endRename}
      />
    </form>
  );
}
