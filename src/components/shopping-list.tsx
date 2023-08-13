"use client";

import { useState } from "react";

import CommandIconText from "@/src/components/command-icon-text";
import { Command, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { Check, ChevronDown, ChevronUp, MoreVertical, Trash2 } from "lucide-react";

type Props = {
  text: string;
  isFirst?: boolean; // 買い物リストの一番上だった場合true
  isLast?: boolean; // 買い物リストの一番下だった場合true
};

// 買い物リスト
export const EditableChecklistItem = ({ text: name, isFirst, isLast }: Props) => {
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
          className={cn(`overflow-hidden text-ellipsis text-sm text-mauve12 md:text-base`, checked && "text-mauve8")}
        >
          {name}
        </div>
      </div>
      <Popover>
        <PopoverTrigger>
          <MoreVertical size={20} />
        </PopoverTrigger>
        <PopoverContent className="grid gap-3 p-3 text-mauve11">
          <Command>
            <CommandList>
              {isFirst && <CommandIconText Icon={ChevronDown} text="上に移動する" />}
              {isLast && <CommandIconText Icon={ChevronUp} text="下に移動する" />}
              <CommandSeparator />
              <CommandIconText Icon={Trash2} text="アイテムを削除する" />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
