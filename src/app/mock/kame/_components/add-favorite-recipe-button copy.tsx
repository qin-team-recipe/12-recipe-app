"use client";

import { useTransition } from "react";

import { addFavoriteRecipe } from "@/src/actions/addFavoriteRecipe";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const AddFavoriteRecipeButton = ({ recipeId }: { recipeId: number }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button onClick={() => startTransition(() => addFavoriteRecipe(recipeId))}>
      {isPending ? <Spinner /> : "追加"}
    </Button>
  );
};

export default AddFavoriteRecipeButton;
