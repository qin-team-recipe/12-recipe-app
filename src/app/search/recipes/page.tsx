import { searchRecipesAndChefs } from "@/src/actions/searchRecipesAndChefs";
import { kInfiniteScrollCount } from "@/src/constants/constants";

import TopBar from "@/src/components/layout/top-bar";
import LinkableTabs from "@/src/components/linkable-tabs";
import LoadMore from "@/src/components/load-more";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeList from "@/src/components/recipe-list";
import SearchInput from "@/src/components/search-input";

import { tabs } from "../_constants/tabs";

const page = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const searchQuery = searchParams.search ?? "";

  const { searchedRecipes } = await searchRecipesAndChefs(searchQuery, {
    skip: 0,
    limit: kInfiniteScrollCount,
  });

  const loadMoreSearchRecipes = async (offset: number = 0) => {
    "use server";

    const { searchedRecipes } = await searchRecipesAndChefs(searchQuery, {
      skip: offset + kInfiniteScrollCount,
      limit: kInfiniteScrollCount,
    });

    const nextOffset = offset + searchedRecipes.length;

    return [
      searchedRecipes.map((recipe) => <RecipeList key={recipe.id} recipes={[recipe]} path="recipe" />),
      nextOffset,
    ] as const;
  };

  return (
    <>
      <TopBar centerComponent={<SearchInput />} />
      <LinkableTabs tabs={tabs} searchQuery={searchQuery}>
        <>
          <p className="px-4 pt-5 text-xl font-bold text-mauve12">
            {searchQuery ? `「${searchQuery}」で検索` : "話題のレシピ"}
          </p>
          {searchedRecipes.length > 0 ? (
            <LoadMore initialOffset={0} loadMoreAction={loadMoreSearchRecipes}>
              <RecipeList recipes={searchedRecipes} path="recipe" />
            </LoadMore>
          ) : (
            <NoDataDisplay text={"お探しのレシピが見つかりませんでした。"} />
          )}
        </>
      </LinkableTabs>
    </>
  );
};

export default page;
