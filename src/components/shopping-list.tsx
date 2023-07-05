"use client";

import { useState } from "react";

import { Check } from "lucide-react";

import { cn } from "../lib/utils";

type Props = {
  text: string;
};

// 買い物リスト
export const EditableChecklistItem = ({ text: name }: Props) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex justify-between gap-x-2 border-y py-4 pl-4 pr-3">
      <div className="flex items-center gap-2">
        <button
          aria-label={checked ? "Uncheck item" : "Check item"}
          className={
            checked
              ? "flex h-5 w-5 items-center justify-center rounded-full border-mauve1 bg-mauve8 p-1 text-mauve1"
              : "h-5 w-5 rounded-full border-2 border-tomato9 p-1"
          }
          onClick={() => setChecked(!checked)}
        >
          {checked && <Check />}
        </button>
        <div
          className={cn(
            `overflow-hidden overflow-ellipsis text-sm text-mauve12 md:text-base`,
            checked && "text-mauve8"
          )}
        >
          {name}
        </div>
      </div>
      {checked && (
        <button className="w-fit whitespace-nowrap rounded-md px-2 text-sm text-tomato9 hover:bg-mauve3 md:text-base">
          削除
        </button>
      )}
    </div>
  );
};
