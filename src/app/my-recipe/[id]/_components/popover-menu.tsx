"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteRecipe } from "@/src/actions/deleteRecipe";
import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";
import { CircleEllipsis, Copy, Lock, Pencil, Trash } from "lucide-react";

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
                  router.push(`/my-recipe/${recipeId}/edit`);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>編集する</span>
              </button>
            </CommandItem>

            <CommandItem>
              {/* // TODO: URLをコピーする */}
              <Copy className="mr-2 h-4 w-4" />
              <span>URLをコピーする</span>
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
                    const { isSuccess } = await deleteRecipe(recipeId);

                    if (isSuccess) {
                      toast({
                        variant: "default",
                        title: "レシピを削除しました",
                        duration: 1500,
                      });
                    } else {
                      toast({
                        variant: "destructive",
                        title: "レシピの削除に失敗しました",
                        duration: 1500,
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
