"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteRecipe } from "@/src/actions/deleteRecipe";
import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";
import { kToastDuration } from "@/src/constants/constants";
import { CircleEllipsis, Copy, Lock, Trash } from "lucide-react";

type Props = {
  recipeId: string;
};

const PopoverMenu = ({ recipeId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const router = useRouter();

  return (
    <Popover>
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
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                <span>URLをコピーする</span>
              </button>
            </CommandItem>
            <CommandItem>
              {/* // TODO: 公開を停止するロジック実装 */}
              <Lock className="mr-2 h-4 w-4" />
              <span>公開を停止する</span>
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
                <Trash className="mr-2 h-4 w-4" />
                <span>{isPending ? <Spinner /> : "レシピを削除する"}</span>
              </button>
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
