"use client";

import { postAllToCart } from "@/src/actions/postAllToCart";
import { ShoppingCart } from "lucide-react";

type Props = {
  recipeId: string;
  ingredientIds: number[];
};

const AddAllIngredientsToCart = ({ recipeId, ingredientIds }: Props) => {
  const handleAddAllCartListItem = async ({recipeId, ingredientIds}: { recipeId: string, ingredientIds: number[]}) => {
    await postAllToCart(recipeId, ingredientIds)
  }

  return (
    <button
      className="flex items-center gap-2 font-bold"
      onClick={() => handleAddAllCartListItem({recipeId, ingredientIds: ingredientIds})}
    >
      <ShoppingCart size={20} />
      <span>まとめてお買い物リストに追加</span>
    </button>
  );
};

export default AddAllIngredientsToCart;
