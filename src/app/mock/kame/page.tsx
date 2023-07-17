import { addCarts } from "@/src/actions/addCarts";
import { getCartList } from "@/src/actions/getCartList";
import { getFavoriteRecipes } from "@/src/actions/getFavoriteRecipes";
import { getRecipes } from "@/src/actions/getRecipes";

import AddCartsRecipeButton from "./_components/add-cart-recipe-button";
import AddFavoriteRecipeButton from "./_components/add-favorite-recipe-button";
import DeleteFavoriteRecipeButton from "./_components/delete-favorite-recipe-button";

const page = async () => {
  const recipes = await getRecipes();
  const favoriteRecipes = await getFavoriteRecipes();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold underline">お気に入り追加</h2>
      <ul className="space-y-2">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title}
            <AddFavoriteRecipeButton recipeId={recipe.id} />
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold underline">お気に入り削除</h2>
      <ul className="space-y-2">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title}
            <DeleteFavoriteRecipeButton recipeId={recipe.id} />
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold underline">お気に入り一覧</h2>
      <ul className="space-y-2">
        {favoriteRecipes.map((fr) => (
          <li key={fr.id}>{fr.recipe.title}</li>
        ))}
      </ul>
      <hr className="py-2" />
    </div>
  );
};

export default page;
