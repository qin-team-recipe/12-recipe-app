"use client";

import { useTransition } from "react";

import { removeCartList } from "@/src/actions/cartListActions";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const RemoveCartListButton = ({ recipeId, ingredientId }: { recipeId: string; ingredientId: number }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button onClick={() => startTransition(() => removeCartList(recipeId, ingredientId))}>
      {isPending ? <Spinner /> : "カート削除"}
    </Button>
  );
};

export default RemoveCartListButton;
