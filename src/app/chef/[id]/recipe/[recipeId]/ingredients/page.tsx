import { getCartList } from "@/src/actions/getCartList";
import { getRecipeById } from "@/src/actions/getRecipeById";
import { ShoppingCart } from "lucide-react";

import AllIngredientsToCart from "@/src/components/all-ingredients-to-cart";
import CopyIngredientsToClipboardButton from "@/src/components/copy-ingredients-to-clipboard-button";
import IngredientToCartIcon from "@/src/components/ingredient-to-cart-icon";

const page = async ({ params }: { params: { recipeId: string; id: string } }) => {
  const { Ingredient: ingredients, servingCount, title } = await getRecipeById(params.recipeId);
  const { isAllCartListItemCompleted, checkIngredientInCart } = await getCartList();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b p-4">
        <h2 className="text-xl font-bold">{servingCount}人前</h2>
        <AllIngredientsToCart
          recipeId={ingredients[0].recipeId}
          ingredientIds={ingredients.map((ingredient) => ingredient.id)}
          isActive={isAllCartListItemCompleted}
        />
      </div>
      <ul>
        {ingredients.map(({ title, id, recipeId }) => (
          <li key={id} className="flex justify-between border-b px-4 py-2">
            <p>{title}</p>
            <IngredientToCartIcon id={id} recipeId={recipeId} isActive={checkIngredientInCart(id)} />
          </li>
        ))}
      </ul>
      <CopyIngredientsToClipboardButton
        recipeName={title}
        servingCount={servingCount}
        ingredients={ingredients.map(({ title }) => ({
          title,
        }))}
      />
    </div>
  );
};

export default page;
