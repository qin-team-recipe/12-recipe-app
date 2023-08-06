import { getNewRecipesFromFollowingChefs } from "@/src/actions/getNewRecipesFromFollowingChefs";
import TopBar from "@/src/components/layout/top-bar";
import LoadMore from "@/src/components/load-more";
import RecipeCard from "@/src/components/recipe-card";
import RecipeList from "@/src/components/recipe-list";
import RouterBackButton from "@/src/components/router-back-button";
import { kInfiniteScrollCount } from "@/src/constants/constants";

const page = async () => {
  const initialRecipes = await getNewRecipesFromFollowingChefs({ skip: 0, limit: kInfiniteScrollCount });

  const loadMoreRecipes = async (offset: number = 0) => {
    "use server";

    const newRecipesFromFollowingChefs = await getNewRecipesFromFollowingChefs({
      skip: offset + kInfiniteScrollCount,
      limit: kInfiniteScrollCount,
    });

    const nextOffset = offset + newRecipesFromFollowingChefs.length;

    return [<RecipeList key={offset} recipes={newRecipesFromFollowingChefs} />, nextOffset] as const;
  };

  return (
    <>
      <TopBar
        leadingComponent={
          <div className="flex items-center gap-3">
            <RouterBackButton size={20} />
            <h1 className="font-bold text-mauve12 md:text-xl">新着レシピ</h1>
          </div>
        }
      />
      <LoadMore initialOffset={0} loadMoreAction={loadMoreRecipes}>
        <RecipeList recipes={initialRecipes} />
      </LoadMore>
    </>
  );
};

export default page;
