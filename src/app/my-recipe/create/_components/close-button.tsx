"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { postDraftRecipe } from "@/src/actions/postDraftRecipe";
import { recipeFormStateAtom } from "@/src/atoms/draftRecipeFormValuesAtom";
import { CreateRecipeFormValues } from "@/src/components/create-recipe-form";
import { CreateDraftRecipeFormValues } from "@/src/components/create-recipe-form/schema";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";
import { useAtom } from "jotai";
import { X } from "lucide-react";

const CloseButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [{ isDraft, draftRecipeFormValues }, setIsEditing] = useAtom(recipeFormStateAtom);

  return (
    // TODO: 下書き保存の処理を実装する
    <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-mauve12">
      {isDraft ? (
        <Dialog>
          <DialogTrigger>
            <X size={20} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="self-center">確認</DialogTitle>
            </DialogHeader>
            <p className="text-center text-sm">作成中のレシピは保存されません。 下書きに保存しますか？</p>
            <DialogFooter>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  startTransition(async () => {
                    const result = await postDraftRecipe(draftRecipeFormValues);

                    if (result.isSuccess) {
                      toast({
                        variant: "default",
                        title: result.message,
                        duration: 3000,
                      });
                      router.push("/my-page");
                    } else {
                      toast({
                        variant: "destructive",
                        title: result.error,
                        duration: 3000,
                      });
                    }

                    setIsEditing({
                      isDraft: false,
                      draftRecipeFormValues: {} as CreateRecipeFormValues,
                    });
                  });
                }}
              >
                {isPending ? <Spinner /> : "保存する"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <X
          size={20}
          onClick={() => {
            setIsEditing({
              isDraft: false,
              draftRecipeFormValues: {} as CreateDraftRecipeFormValues,
            });
            router.push("/my-page");
          }}
        />
      )}
    </div>
  );
};

export default CloseButton;
