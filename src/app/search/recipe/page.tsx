import { searchRecipesAndChefs } from "@/src/actions/searchRecipesAndChefs";
import TopBar from "@/src/components/layout/top-bar";
import LinkableTabs from "@/src/components/linkable-tabs";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeCard from "@/src/components/recipe-card";
import SearchInput from "@/src/components/search-input";

import { tabs } from "../_constants/tabs";

const page = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const searchQuery = searchParams.search ?? "";

  const { searchedRecipes } = await searchRecipesAndChefs(searchQuery);

  return (
    <>
      <TopBar centerComponent={<SearchInput />} />
      <LinkableTabs tabs={tabs} searchQuery={searchQuery}>
        <>
          <p className="px-4 pt-5 text-xl font-bold text-mauve12">
            {searchQuery ? `「${searchQuery}」で検索` : "話題のレシピ"}
          </p>
          {searchedRecipes.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4 p-4">
              {searchedRecipes.map(({ id, description, title }) => (
                <li key={id}>
                  <RecipeCard
                    title={title}
                    description={description}
                    imageUrl="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
                    favorites={0}
                    path={`/recipes/${id}`}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <NoDataDisplay text={"お探しのレシピが見つかりませんでした。"} />
          )}
        </>
      </LinkableTabs>
    </>
  );
};

export default page;
