"use client";

import { useRouter } from "next/navigation";

import { postDraftRecipe } from "@/src/actions/postDraftRecipe";
import { recipeFormStateAtom } from "@/src/atoms/draftRecipeFormValuesAtom";
import { kToastDuration } from "@/src/constants/constants";
import { useAtom } from "jotai";
import { X } from "lucide-react";

import { CreateRecipeFormValues } from "@/src/components/create-recipe-form";
import { CreateDraftRecipeFormValues } from "@/src/components/create-recipe-form/schema";
import SelectableDialog from "@/src/components/selectable-dialog";
import { useToast } from "@/src/components/ui/use-toast";

const CloseButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [{ isDraft, draftRecipeFormValues }, setIsEditing] = useAtom(recipeFormStateAtom);

  return (
    <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-mauve12">
      {isDraft ? (
        <SelectableDialog
          title="確認"
          message="作成中のレシピは保存されません。 下書きに保存しますか？"
          triggerComponent={<X size={20} />}
          onConfirm={async () => {
            const result = await postDraftRecipe(draftRecipeFormValues);

            if (result.isSuccess) {
              toast({
                variant: "default",
                title: result.message,
                duration: kToastDuration,
              });
              router.push("/my-page");
            } else {
              toast({
                variant: "destructive",
                title: result.error,
                duration: kToastDuration,
              });
            }

            setIsEditing({
              isDraft: false,
              draftRecipeFormValues: {} as CreateRecipeFormValues,
            });
          }}
          confirmLabel="保存する"
          onCancel={() => {
            setIsEditing({
              isDraft: false,
              draftRecipeFormValues: {} as CreateDraftRecipeFormValues,
            });
            router.push("/my-page");
          }}
          cancelLabel="保存せずに戻る"
        />
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
