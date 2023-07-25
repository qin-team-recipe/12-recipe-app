import { getCartList } from "@/src/actions/getCartList";
import { getMyFavoriteRecipes } from "@/src/actions/getMyFavoriteRecipes";
import { getRecipes } from "@/src/actions/getRecipes";

import AddCartListButton from "./_components/add-cart-list-button";
import AddFavoriteRecipeButton from "./_components/add-favorite-recipe-button";
import DeleteFavoriteRecipeButton from "./_components/delete-favorite-recipe-button";

const page = async () => {
  const recipes = await getRecipes();
  const favoriteRecipes = await getMyFavoriteRecipes();
  const cartList = await getCartList();

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
          <li key={fr.id}>{fr.title}</li>
        ))}
      </ul>
      <hr className="py-2" />
      <h2 className="text-2xl font-bold underline">カート</h2>
      {cartList.map((cl) => (
        <div key={cl.id} className="p-2">
          <h3 className="text-lg font-bold">{cl.recipe.title}</h3>
          {cl.CartListItem.map((item) => (
            <>
              <label key={item.id}>
                {item.ingredient.title}
                <input type="checkbox" checked={item.isCompleted} />
              </label>
              <br />
            </>
          ))}
        </div>
      ))}
      <AddCartListButton recipeId={"3"} ingredientIds={[3]} />
    </div>
  );
};

export default page;
