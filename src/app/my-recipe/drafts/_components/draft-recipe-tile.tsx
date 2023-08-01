"use client";

import { useTransition } from "react";

import { deleteDraftRecipe } from "@/src/actions/deleteDraftRecipe";
import QueryParamsLink from "@/src/components/query-params-link";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";
import { MoreVertical, Pencil, Pointer, Trash } from "lucide-react";

type Props = {
  id: string;
  title: string | null;
  createdAt: Date | null;
};

const DraftRecipeTile = ({ id, title, createdAt }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <>
      <div className="flex flex-col">
        <p className="">{title ? title : "レシピ名未記載"}</p>
        {createdAt && (
          <p className="text-sm text-mauve10">
            作成日時:{" "}
            {new Date(createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>
      <Popover>
        <PopoverTrigger>
          <MoreVertical size={20} />
        </PopoverTrigger>
        <PopoverContent align="end" className="p-2">
          <Command className="w-full">
            <CommandList>
              <CommandItem>
                <QueryParamsLink path="/my-recipe/create" name="draftId" value={id} className="flex">
                  <Pointer className="mr-2 h-4 w-4" />
                  <span>この下書きを使用する</span>
                </QueryParamsLink>
              </CommandItem>
              <CommandItem className="text-mauve11">
                <button
                  className="flex"
                  onClick={() => {
                    startTransition(async () => {
                      const { isSuccess } = await deleteDraftRecipe(id);

                      if (isSuccess) {
                        toast({
                          variant: "default",
                          title: "下書きレシピを削除しました",
                          duration: 3000,
                        });
                      } else {
                        toast({
                          variant: "destructive",
                          title: "下書きレシピの削除に失敗しました",
                          duration: 3000,
                        });
                      }
                    });
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>{isPending ? <Spinner /> : "下書きを削除する"}</span>
                </button>
              </CommandItem>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DraftRecipeTile;
