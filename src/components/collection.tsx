"use client";

import clsx from "clsx";
import { ChevronRight, EllipsisVertical } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
    <details className="bg-accent rounded-md" onToggle={handleToggle}>
      <summary className="appearance-auto">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-x-0.5 pr-1">
            <ChevronRight
              className={clsx("w-full max-w-5 h-5", isOpened && "rotate-90")}
            />
            <span>{collection.name}</span>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="size-fit p-0.5"
                title="Options"
              >
                <EllipsisVertical className="size-5" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-fit p-3">
              <section className="flex flex-col gap-y-2 text-sm">
                <Button variant="ghost" size="sm" type="button">
                  Rename
                </Button>

                <Button variant="destructive" size="sm" type="button">
                  Delete
                </Button>
              </section>
            </PopoverContent>
          </Popover>
        </div>
      </summary>

      <p>Collection ID: {collection.id}</p>
    </details>
  );
}
