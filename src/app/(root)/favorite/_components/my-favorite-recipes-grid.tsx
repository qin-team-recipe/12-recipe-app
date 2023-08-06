import { getMyFavoriteRecipes } from "@/src/actions/getMyFavoriteRecipes";
import LoadMore from "@/src/components/load-more";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeList from "@/src/components/recipe-list";
import { kInfiniteScrollCount } from "@/src/constants/constants";

const MyFavoriteRecipesGrid = async () => {
  const initMyFavoriteRecipes = await getMyFavoriteRecipes();

  const loadMoreMyFavoriteRecipes = async (offset: number = 0) => {
    "use server";

    const myRecipes = await getMyFavoriteRecipes({
      skip: offset + kInfiniteScrollCount,
    });

    const nextOffset = offset + myRecipes.length;

    return [myRecipes.map((recipe) => <RecipeList key={recipe.id} recipes={[recipe]} />), nextOffset] as const;
  };

  return (
    <>
      {initMyFavoriteRecipes.length > 0 ? (
        <LoadMore initialOffset={0} loadMoreAction={loadMoreMyFavoriteRecipes}>
          <RecipeList recipes={initMyFavoriteRecipes} />
        </LoadMore>
      ) : (
        <NoDataDisplay text="まだお気に入りのレシピはありません。" />
      )}
    </>
  );
};

export default MyFavoriteRecipesGrid;
