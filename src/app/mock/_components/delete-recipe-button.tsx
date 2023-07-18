"use client";

import { deleteRecipe } from "@/src/actions/deleteRecipe";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";

type Props = {
  recipeId: string;
};

const DeleteRecipeButton = ({ recipeId }: Props) => {
  const { toast } = useToast();

  return (
    <>
      <form className="self-end">
        <input type="hidden" name="recipeId" value={recipeId} />
        <Button
          onClick={() => {
            deleteRecipe(recipeId)
              .then(() => {
                toast({
                  title: "レシピを削除しました",
                  duration: 1000,
                });
              })
              .catch(() => {
                toast({
                  variant: "destructive",
                  title: "レシピの削除に失敗しました",
                });
              });
          }}
          className="w-fit bg-tomato11"
        >
          削除
        </Button>
      </form>
    </>
  );
};

export default DeleteRecipeButton;
