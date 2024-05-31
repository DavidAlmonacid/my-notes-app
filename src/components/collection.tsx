"use client";

import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface Props {
  collection: {
    id: string;
    name: string;
  };
}

export function Collection({ collection }: Props) {
  const [isOpened, setIsOpened] = useState(false);

  const handleToggle = (event: React.MouseEvent<HTMLDetailsElement>) => {
    setIsOpened(event.currentTarget.open);
  };

  return (
    <details onToggle={handleToggle}>
      <summary className="appearance-auto">
        <div className="flex items-center gap-x-0.5 py-2">
          <ChevronRight className={clsx("size-5", isOpened && "rotate-90")} />
          <span>{collection.name}</span>
        </div>
      </summary>

      <p>Collection ID: {collection.id}</p>
    </details>
  );
}
