"use client";

import { addCartListItem, removeCartListItem } from "@/src/actions/cartListItemActions";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { experimental_useOptimistic as useOptimistic, useState } from "react";
import { getCartList } from "@/src/actions/getCartList";
import { CartList } from "@prisma/client";

type Props = {
  id: number;
  recipeId: string;
  cartList: any;
};

const IngredientToCart = ({ id, recipeId, cartList }: Props) => {
  const [isClicked, setIsClicked] = useState(false)
  const handleAddCartListItem = async ({recipeId, ingredientId}: { recipeId: string, ingredientId: number}) => {
    console.log(recipeId)
    console.log("aaaaa")
    // const addedCartList = cartList.filter((list: any) => list.recipeId === recipeId)[0].CartListItem
    const addedCartList = cartList.filter((list: any) => list.recipeId === recipeId)[0]
    const addedCartListItem = addedCartList.CartListItem
    console.log(addedCartList)
    console.log(addedCartList.recipe.title)
    console.log(addedCartListItem)
    console.log(ingredientId)
    // const cartState = addedCartListItem.find(item => item.recipe.title === addedCartList.recipe.title)
    // console.log(addedCartList[0].CartListItem)
    const addedCartResult = await addCartListItem(recipeId, ingredientId)
    if (!addedCartResult.isSuccess) {
      const removedCartResult = await removeCartListItem(recipeId, ingredientId)
      console.log(removedCartResult)
      setIsClicked(removedCartResult.isSuccess)
    } else {

    }
    console.log(addedCartResult)
    setIsClicked(addedCartResult.isSuccess)
  }

  return (
    <button className={cn("pl-[20px] text-mauve10 hover:text-mauve11", isClicked && "text-mauve12 hover:text-mauve12")} onClick={() => handleAddCartListItem({recipeId, ingredientId: id})}>
      <ShoppingCart size={20} />
    </button>
  );
};

export default IngredientToCart;
