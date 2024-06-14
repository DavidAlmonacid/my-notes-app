import { deleteCollection } from "@/actions/collection-actions";
import { Button } from "./ui/button";

interface Props {
  collectionId: string;
  children: React.ReactNode;
  formWidth?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function DeleteCollectionButton({
  collectionId,
  children,
  formWidth,
  className,
  size = "default"
}: Props) {
  return (
    <form action={deleteCollection} className={formWidth}>
      <input type="hidden" name="collectionId" value={collectionId} />
      <Button
        variant="destructive"
        size={size}
        className={className}
        type="submit"
      >
        {children}
      </Button>
    </form>
  );
}
