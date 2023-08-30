import { getRecipeById } from "@/src/actions/getRecipeById";
import CopyIngredientsToClipboardButton from "@/src/components/copy-ingredients-to-clipboard-button";
import IngredientToCart from "../_components/add-ingredient-to-cart";
import AllIngredientsToCart from "../_components/add-all-ingredients-to-cart";

const page = async ({ params }: { params: { id: string } }) => {
  const { Ingredient: ingredients, servingCount, title } = await getRecipeById(params.id);
  const ingredientIds = ingredients.map((ingredient) => Number(ingredient.id))

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b p-4">
        <h2 className="text-xl font-bold">{servingCount}人前</h2>
        <AllIngredientsToCart recipeId={ingredients[0].recipeId} ingredientIds={ingredientIds} />
      </div>
      <ul>
        {ingredients.map(({ title, id, recipeId }) => (
          <li key={id} className="flex justify-between border-b px-4 py-2">
            <p>{title}</p>
            <IngredientToCart id={id} recipeId={recipeId} />
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
