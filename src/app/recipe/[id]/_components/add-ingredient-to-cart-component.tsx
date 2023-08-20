"use client";

import { addCartListItem } from "@/src/actions/cartListItemActions";
import { ShoppingCart } from "lucide-react";

type Props = {
  id: number;
  title: string;
  recipeId: string;
};

const AddIngredientToCart = ({ id, title, recipeId }: Props) => {
  const handleAddCartListItem = async ({recipeId, ingredientId}: { recipeId: string, ingredientId: number}) => {
    await addCartListItem(recipeId, ingredientId)
  }

  return (
    <ul key={id}>
      <li className="flex justify-between border-b px-4 py-2">
        <p className="">{title}</p>
        <button className=" pl-[20px] text-mauve11 hover:text-mauve12" onClick={() => handleAddCartListItem({recipeId, ingredientId: id})}>
          <ShoppingCart size={20} />
        </button>
      </li>
    </ul>
  );
};

export default AddIngredientToCart;
