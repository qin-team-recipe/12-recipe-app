import { getFavoriteRecipes } from "@/src/actions/getFavoriteRecipes";
import { getRecipes } from "@/src/actions/getRecipes";

import AddFavoriteRecipeButton from "./_components/add-favorite-recipe-button copy";
import DeleteFavoriteRecipeButton from "./_components/delete-favorite-recipe-button";

const page = async () => {
  const recipes = await getRecipes();
  const favoriteRecipes = await getFavoriteRecipes();

  return (
    <>
      <h2>お気に入り追加</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title}
            <AddFavoriteRecipeButton recipeId={recipe.id} />
          </li>
        ))}
      </ul>
      <h2>お気に入り削除</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title}
            <DeleteFavoriteRecipeButton recipeId={recipe.id} />
          </li>
        ))}
      </ul>
      <h2>お気に入り一覧</h2>
      <ul>
        {favoriteRecipes.map((fr) => (
          <li key={fr.id}>{fr.recipe.title}</li>
        ))}
      </ul>
    </>
  );
};

export default page;
