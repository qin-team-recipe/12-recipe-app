"use client";

import { useTransition } from "react";

import { addAllToCart } from "@/src/actions/addAllToCart";
import Spinner from "@/src/components/ui/spinner";
import { cn } from "@/src/lib/utils";
import { ShoppingCart } from "lucide-react";

type Props = {
  recipeId: string;
  isAllInCart: boolean;
  ingredientIds: number[];
};

const AddAllToCartButton = ({ ingredientIds, isAllInCart, recipeId }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className={cn("items-center", "font-bold", "flex", "gap-2", isAllInCart ? "text-mauve12" : "text-mauve9")}
      onClick={() => {
        startTransition(() => addAllToCart(recipeId, ingredientIds));
      }}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <ShoppingCart size={20} />
          <span>まとめてお買い物リストに追加</span>
        </>
      )}
    </button>
  );
};

export default AddAllToCartButton;
