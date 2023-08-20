import { getRecipeById } from "@/src/actions/getRecipeById";
import CopyIngredientsToClipboardButton from "@/src/components/copy-ingredients-to-clipboard-button";
import { ShoppingCart } from "lucide-react";
import AddIngredientToCart from "../_components/add-ingredient-to-cart-component";
import AddAllIngredientsToCart from "../_components/add-all-ingredients-to-cart-component";

const page = async ({ params }: { params: { id: string } }) => {
  const { Ingredient: ingredients, servingCount, title } = await getRecipeById(params.id);
  const ingredientIds = ingredients.map((ingredient) => Number(ingredient.id))

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b p-4">
        <h2 className="text-xl font-bold">{servingCount}人前</h2>
        <AddAllIngredientsToCart recipeId={ingredients[0].recipeId} ingredientIds={ingredientIds} />
      </div>
      {ingredients.map(({ title, id, recipeId }) => (
        <AddIngredientToCart key={id} title={title} id={id} recipeId={recipeId} />
      ))}
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
