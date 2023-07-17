"use client";

import { useTransition } from "react";

import { addCarts } from "@/src/actions/addCarts";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const AddCartsRecipeButton = ({ recipeId, ingredientIds }: { recipeId: string; ingredientIds: number[] }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button onClick={() => startTransition(() => addCarts(recipeId, ingredientIds))}>
      {isPending ? <Spinner /> : "カート追加"}
    </Button>
  );
};

export default AddCartsRecipeButton;
