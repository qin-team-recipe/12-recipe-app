"use client";

import { useTransition } from "react";

import { addCartList } from "@/src/actions/cartListActions";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const AddCartListButton = ({ recipeId, ingredientId }: { recipeId: string; ingredientId: number }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button onClick={() => startTransition(() => addCartList(recipeId, ingredientId))}>
      {isPending ? <Spinner /> : "カート追加"}
    </Button>
  );
};

export default AddCartListButton;
