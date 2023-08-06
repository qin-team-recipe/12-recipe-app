import { getMyRecipes } from "@/src/actions/getMyRecipes";
import LoadMore from "@/src/components/load-more";
import NoDataDisplay from "@/src/components/no-data-display";
import { kInfiniteScrollCount } from "@/src/constants/constants";

import RecipeList from "../../../components/recipe-list";

const page = async () => {
  const initialRecipes = await getMyRecipes(
    { orderByLikes: false },
    {
      skip: 0,
      limit: kInfiniteScrollCount,
    }
  );

  const loadMoreMyRecipes = async (offset: number = 0) => {
    "use server";

    const myRecipes = await getMyRecipes(
      { orderByLikes: false },
      {
        skip: offset + kInfiniteScrollCount,
        limit: kInfiniteScrollCount,
      }
    );

    const nextOffset = offset + myRecipes.length;

    return [<RecipeList key={offset} recipes={myRecipes} />, nextOffset] as const;
  };

  return (
    <>
      {initialRecipes.length > 0 ? (
        <LoadMore initialOffset={0} loadMoreAction={loadMoreMyRecipes}>
          <RecipeList recipes={initialRecipes} />
        </LoadMore>
      ) : (
        <NoDataDisplay text="まだレシピが作成されていません。" />
      )}
    </>
  );
};

export default page;
