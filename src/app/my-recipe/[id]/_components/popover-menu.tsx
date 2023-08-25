"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteRecipe } from "@/src/actions/deleteRecipe";
import { patchRecipePublishStatus } from "@/src/actions/patchRecipePublishStatus";
import { kToastDuration } from "@/src/constants/constants";
import { CircleEllipsis, Copy, Lock, Trash } from "lucide-react";

import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";

type Props = {
  recipeId: string;
  isPublished: boolean;
};

const PopoverMenu = ({ recipeId, isPublished }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const router = useRouter();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <CircleEllipsis size={20} />
      </PopoverTrigger>
      <PopoverContent align="end" className="p-2">
        <Command className="w-full">
          <CommandList>
            <CommandItem>
              <button
                className="flex"
                onClick={() => {
                  navigator.clipboard
                    .writeText(`${location.origin}/recipe/${recipeId}`)
                    .then(() => {
                      toast({
                        variant: "default",
                        title: "コピーしました🎉",
                        duration: 3000,
                      });
                    })
                    .catch(() => {
                      toast({
                        variant: "destructive",
                        title: "コピーに失敗しました🥲",
                        duration: 3000,
                      });
                    });

                  setIsOpen(false);
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                <span>URLをコピーする</span>
              </button>
            </CommandItem>
            <CommandItem>
              <button
                className="flex items-start"
                onClick={async () => {
                  const result = await patchRecipePublishStatus(recipeId);
                  if (result.isSuccess) {
                    toast({
                      variant: "default",
                      title: result.message,
                      duration: kToastDuration,
                    });
                  } else {
                    toast({
                      variant: "destructive",
                      title: result.error,
                      duration: kToastDuration,
                    });
                  }

                  setIsOpen(false);
                }}
              >
                {isPending ? <Spinner /> : <Lock className="mr-2 h-4 w-4" />}
                <div className="flex flex-col items-start">
                  <span className="text-sm">{isPublished ? "公開を停止する" : "レシピを限定公開にする"}</span>
                  {!isPublished && <p className="text-xs">URLを知っている方のみ閲覧可能</p>}
                </div>
              </button>
            </CommandItem>

            <CommandSeparator />

            <CommandItem>
              <button
                className="flex"
                onClick={() => {
                  startTransition(async () => {
                    const result = await deleteRecipe(recipeId);

                    if (result.isSuccess) {
                      toast({
                        variant: "default",
                        title: result.message,
                        duration: kToastDuration,
                      });
                    } else {
                      toast({
                        variant: "destructive",
                        title: result.error,
                        duration: kToastDuration,
                      });
                    }

                    router.push(`/my-page`);
                  });
                }}
              >
                {isPending ? <Spinner /> : <Trash className="mr-2 h-4 w-4" />}
                <span>レシピを削除する</span>
              </button>
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
