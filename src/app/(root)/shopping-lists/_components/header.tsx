"use client";

import CommandIconText from "@/src/components/command-icon-text";
import { Command, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CheckCircle2, ChefHat, ChevronDown, CircleEllipsis, Plus, Trash2 } from "lucide-react";

type Props = {
  title: string;
  isRecipe?: boolean; // レシピがあるかの判断(もし他の実装が良ければ変更可能)
};

const Header = ({ title, isRecipe }: Props) => {
  return (
    <div className="mx-4 mb-3 mt-5 flex justify-between">
      <h6 className="truncate text-base font-bold">{title}</h6>
      <div className="ml-4 flex gap-4">
        {/* TODO: リスト追加機能はAPI繋ぎこみ時に対応 */}
        <Plus size={20} />
        <Popover>
          <PopoverTrigger>
            <CircleEllipsis size={20} />
          </PopoverTrigger>
          <PopoverContent className="grid gap-3 p-3 text-mauve11">
            <Command>
              <CommandList>
                {isRecipe && (
                  <>
                    <CommandIconText Icon={ChefHat} text="レシピ詳細をみる" />
                    <CommandIconText Icon={ChevronDown} text="下に移動する" />
                    <CommandSeparator />
                  </>
                )}
                <CommandIconText Icon={CheckCircle2} text="完了したアイテムだけ削除する" />
                <CommandIconText Icon={Trash2} text="すべてのアイテムを削除する" />
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
