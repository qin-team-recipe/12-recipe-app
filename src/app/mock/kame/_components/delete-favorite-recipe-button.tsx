"use client";

import { useTransition } from "react";

import { deleteFavoriteRecipe } from "@/src/actions/favoriteRecipeActions";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const DeleteFavoriteRecipeButton = ({ recipeId }: { recipeId: number }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button onClick={() => startTransition(() => deleteFavoriteRecipe(recipeId))}>
      {isPending ? <Spinner /> : "削除"}
    </Button>
  );
};

export default DeleteFavoriteRecipeButton;
