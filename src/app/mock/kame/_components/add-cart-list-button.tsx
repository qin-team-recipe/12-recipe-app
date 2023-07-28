"use client";

import { useTransition } from "react";

import { addAllToCart } from "@/src/actions/addAllToCart";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const AddCartListButton = ({ recipeId, ingredientIds }: { recipeId: string; ingredientIds: number[] }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button onClick={() => startTransition(() => addAllToCart(recipeId, ingredientIds))}>
      {isPending ? <Spinner /> : "カート追加"}
    </Button>
  );
};

export default AddCartListButton;
