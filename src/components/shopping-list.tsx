"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";

// 買い物リスト
export const ShoppingListItem = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex justify-between gap-x-2 border-y pl-4 pr-3 py-4">
      <div className="flex items-center gap-2">
        {checked ? (
          <button
            aria-label="Toggle checkbox"
            className="flex h-5 w-5 items-center justify-center rounded-full border-mauve1 bg-mauve8 p-1 text-mauve1"
            onClick={() => setChecked(false)}
          >
            <Check className="h-5 w-5" />
          </button>
        ) : (
          <button
            aria-label="Toggle checkbox"
            className="h-5 w-5 rounded-full border-2 border-tomato9 p-1"
            onClick={() => setChecked(true)}
          />
        )}
        <div className={cn(`overflow-hidden overflow-ellipsis text-sm text-mauve12`, checked && "text-mauve8")}>ああ</div>
      </div>
      {checked && (
        <button className="w-fit whitespace-nowrap rounded-md px-2 text-tomato9 text-sm hover:bg-mauve3">削除</button>
      )}
    </div>
  );
};
