"use client";

import { useTransition } from "react";

import { favoriteRecipe } from "@/src/actions/favoriteRecipeActions";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const AddFavoriteRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form>
      <input type="hidden" name="recipeId" value={recipeId} />
      <Button formAction={(formData) => startTransition(() => favoriteRecipe(formData))}>
        {isPending ? <Spinner /> : "追加"}
      </Button>
    </form>
  );
};

export default AddFavoriteRecipeButton;
