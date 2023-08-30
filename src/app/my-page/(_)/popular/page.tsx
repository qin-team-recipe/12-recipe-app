import { getMyRecipes } from "@/src/actions/getMyRecipes";
import { kInfiniteScrollCount } from "@/src/constants/constants";

import LoadMore from "@/src/components/load-more";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeList from "@/src/components/recipe-list";

const page = async () => {
  const initialRecipes = await getMyRecipes({ orderByLikes: true, limit: kInfiniteScrollCount });

  const loadMoreMyRecipe = async (offset: number = 0) => {
    "use server";

    const myRecipes = await getMyRecipes({
      orderByLikes: true,
      skip: offset + kInfiniteScrollCount,
      limit: kInfiniteScrollCount,
    });

    const nextOffset = offset + myRecipes.length;

    return [
      myRecipes.map((recipe) => <RecipeList key={recipe.id} recipes={[recipe]} path="my-recipe" />),
      nextOffset,
    ] as const;
  };

  return (
    <>
      {initialRecipes.length > 0 ? (
        <LoadMore initialOffset={0} loadMoreAction={loadMoreMyRecipe}>
          <RecipeList recipes={initialRecipes} path="my-recipe" />
        </LoadMore>
      ) : (
        <NoDataDisplay text="まだレシピが作成されていません。" />
      )}
    </>
  );
};

export default page;
