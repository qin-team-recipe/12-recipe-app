import { getRecipesNewFromFollowedChefs } from "@/src/actions/getRecipesNewFromFollowedChefs";
import TopBar from "@/src/components/layout/top-bar";
import LoadMore from "@/src/components/load-more";
import RecipeList from "@/src/components/recipe-list";
import RouterBackButton from "@/src/components/router-back-button";
import { kInfiniteScrollCount } from "@/src/constants/constants";

const page = async () => {
  const initialRecipes = await getRecipesNewFromFollowedChefs();

  const loadMoreRecipes = async (offset: number = 0) => {
    "use server";

    const newRecipesFromFollowingChefs = await getRecipesNewFromFollowedChefs({
      skip: offset + kInfiniteScrollCount,
    });

    const nextOffset = offset + newRecipesFromFollowingChefs.length;

    return [
      newRecipesFromFollowingChefs.map((recipe) => <RecipeList key={recipe.id} recipes={[recipe]} segment="recipe" />),
      nextOffset,
    ] as const;
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
        <RecipeList recipes={initialRecipes} segment="recipe" />
      </LoadMore>
    </>
  );
};

export default page;
