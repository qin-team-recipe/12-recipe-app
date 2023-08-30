"use client";

import { postAllToCart } from "@/src/actions/postAllToCart";
import { cn } from "@/src/lib/utils";
import { ShoppingCart } from "lucide-react";
import { experimental_useOptimistic as useOptimistic, useState } from "react";

type Props = {
  recipeId: string;
  ingredientIds: number[];
};

const AllIngredientsToCart = ({ recipeId, ingredientIds }: Props) => {
  // const [isClicked, setIsClicked] = useState(false)
  // const [isClicked, setIsClicked] = useOptimistic(false, (state, flag) => !flag)
  const [isClicked, setIsClicked] = useOptimistic(false)
  const handleAddAllCartListItem = async ({recipeId, ingredientIds}: { recipeId: string, ingredientIds: number[]}) => {
    const result = await postAllToCart(recipeId, ingredientIds)
    console.log(result);
    setIsClicked(result.isSuccess)
  }
console.log(isClicked)
  return (
    <button
      className={cn("flex items-center gap-2 font-bold text-mauve10 hover:text-mauve11", isClicked && "text-mauve12 hover:text-mauve12")}
      onClick={() => handleAddAllCartListItem({recipeId, ingredientIds: ingredientIds})}
    >
      <ShoppingCart size={20} />
      <span>まとめてお買い物リストに追加</span>
    </button>
  );
};

export default AllIngredientsToCart;
