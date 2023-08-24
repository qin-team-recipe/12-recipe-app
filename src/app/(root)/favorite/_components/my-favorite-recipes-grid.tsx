import { getRecipesInMyFavorites } from "@/src/actions/getRecipesInMyFavorites";
import { kInfiniteScrollCount } from "@/src/constants/constants";

import LoadMore from "@/src/components/load-more";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeList from "@/src/components/recipe-list";

const MyFavoriteRecipesGrid = async () => {
  const initMyFavoriteRecipes = await getRecipesInMyFavorites();

  const loadMoreMyFavoriteRecipes = async (offset: number = 0) => {
    "use server";

    const myRecipes = await getRecipesInMyFavorites({
      skip: offset + kInfiniteScrollCount,
    });

    const nextOffset = offset + myRecipes.length;

    return [
      myRecipes.map((recipe) => <RecipeList key={recipe.id} recipes={[recipe]} segment="recipe" />),
      nextOffset,
    ] as const;
  };

  return (
    <>
      {initMyFavoriteRecipes.length > 0 ? (
        <LoadMore initialOffset={0} loadMoreAction={loadMoreMyFavoriteRecipes}>
          <RecipeList recipes={initMyFavoriteRecipes} segment="recipe" />
        </LoadMore>
      ) : (
        <NoDataDisplay text="まだお気に入りのレシピはありません。" />
      )}
    </>
  );
};

export default MyFavoriteRecipesGrid;
