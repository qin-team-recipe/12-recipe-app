"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { deleteRecipe } from "@/src/actions/deleteRecipe";
import { kToastDuration } from "@/src/constants/constants";
import { CircleEllipsis, Pencil, Trash } from "lucide-react";

import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";

type Props = {
  chefId: string;
  recipeId: string;
};

const PopoverMenu = ({ chefId, recipeId }: Props) => {
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
              <Link href={`/admin/${chefId}/recipe/${recipeId}/edit`} className="flex">
                <Pencil size={16} className="mr-2 h-4 w-4" />
                <span>レシピを編集する</span>
              </Link>
            </CommandItem>

            <CommandSeparator />

            <CommandItem>
              <button
                className="flex w-full"
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

                    router.push(`/admin/${chefId}`);
                  });
                }}
              >
                <div className="flex gap-2">
                  {isPending ? <Spinner /> : <Trash className="h-4 w-4" />}
                  <span>レシピを削除する</span>
                </div>
              </button>
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
