"use client";

import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react";

import CommandIconText from "@/src/components/command-icon-text";
import { Command, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { Check, ChevronDown, ChevronUp, MoreVertical, Trash2 } from "lucide-react";

import { Textarea } from "./ui/textarea";

type Props = {
  text: string;
  isFirst?: boolean; // 買い物リストの一番上だった場合true
  isLast?: boolean; // 買い物リストの一番下だった場合true
};

// 買い物リスト
export const EditableChecklistItem = ({ text: name, isFirst, isLast }: Props) => {
  const [checked, setChecked] = useState(false);
  // TODO: バックエンドと繋げる際にreact-hook-formを使用した書き方に変更する
  const [value, setValue] = useState(name);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [, startTransition] = useTransition();

  // textareaの高さを自動的に対応してくれる処理
  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.style.height = "auto"; // will not work without this!
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleChangeCartText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    startTransition(() => {
      setValue(e.target.value);
      resizeTextArea();
    });
  };

  // 1回目の読み込み時にテキストエリアのサイズを調整する
  useEffect(() => {
    resizeTextArea();
    window.addEventListener("resize", resizeTextArea);
  }, []);

  return (
    <div className="flex flex-row justify-between gap-x-2 border-y py-4 pl-4 pr-3">
      <div className="flex basis-11/12 items-center gap-2">
        <button
          aria-label={checked ? "Uncheck item" : "Check item"}
          className={
            checked
              ? "flex h-5 w-5 items-center justify-center rounded-full border-mauve1 bg-mauve8 p-1 leading-9 text-mauve1"
              : "h-5 w-5 rounded-full border-2 border-tomato9 p-1"
          }
          onClick={() => setChecked(!checked)}
        >
          {checked && <Check />}
        </button>
        <Textarea
          className={cn(
            ` min-h-0 resize-none border-none bg-white text-sm text-mauve12 focus:outline-0 focus-visible:ring-0 md:text-base`,
            checked && "text-mauve8"
          )}
          ref={textAreaRef}
          wrap="soft"
          value={value}
          rows={1}
          onChange={handleChangeCartText}
        />
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
