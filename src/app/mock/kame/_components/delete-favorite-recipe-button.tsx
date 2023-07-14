"use client";

import { useTransition } from "react";

import { unFavoriteRecipe } from "@/src/actions/favoriteRecipeActions";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const DeleteFavoriteRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form>
      <input type="hidden" name="recipeId" value={recipeId} />
      <Button formAction={(formData) => startTransition(() => unFavoriteRecipe(formData))}>
        {isPending ? <Spinner /> : "削除"}
      </Button>
    </form>
  );
};

export default DeleteFavoriteRecipeButton;
