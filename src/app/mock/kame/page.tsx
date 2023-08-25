import { getCartList } from "@/src/actions/getCartList";
import { getRecipes } from "@/src/actions/getRecipes";
import { getRecipesInMyFavorites } from "@/src/actions/getRecipesInMyFavorites";
import { prisma } from "@/src/lib/prisma";

import AddCartListButton from "./_components/add-cart-list-button";
import AddFavoriteRecipeButton from "./_components/add-favorite-recipe-button";
import DeleteCartListButton from "./_components/delete-cart-list-button";
import DeleteFavoriteRecipeButton from "./_components/delete-favorite-recipe-button";
import RemoveCartListButton from "./_components/remove-cart-list-button";

const getAllRecipes = async () => {
  // 表示確認用のapiのため、本番利用禁止
  const recipe = await prisma.recipe.findMany({
    include: {
      Ingredient: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return recipe;
};

const page = async () => {
  const recipes = await getRecipes();
  const favoriteRecipes = await getRecipesInMyFavorites();
  const cartList = await getCartList();
  const allRecipes = await getAllRecipes();

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
        <div key={cl.id} className="mb-4 mr-1 flex gap-2">
          <div className="mr-6 flex items-center">
            <h3 className="text-lg font-bold">{cl.recipe.title}</h3>
            <DeleteCartListButton cartListId={cl.id} />
          </div>
          {cl.CartListItem.map((item) => (
            <div key={item.id} className="mr-6 flex items-center">
              <p>{item.ingredient.title}</p>
              <RemoveCartListButton recipeId={cl.recipeId} cartListItemId={item.id} />
              <br />
            </div>
          ))}
        </div>
      ))}
      {allRecipes.map((recipe) => (
        <div key={recipe.id} className="mb-6">
          {recipe.Ingredient.map((i) => (
            <p key={i.id} className="mb-1">
              <AddCartListButton
                recipeId={recipe.id}
                ingredientIds={[i.id]}
                text={`${recipe.title}の${i.title}を追加`}
              />
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default page;
