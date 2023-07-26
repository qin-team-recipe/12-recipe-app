import { searchRecipesAndChefs } from "@/src/actions/searchRecipesAndChefs";
import ChefTileList from "@/src/components/chef-tile-list";
import TopBar from "@/src/components/layout/top-bar";
import LinkableTabs from "@/src/components/linkable-tabs";
import NoDataDisplay from "@/src/components/no-data-display";
import SearchInput from "@/src/components/search-input";

import { tabs } from "../_constants/tabs";

const page = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const searchQuery = searchParams.search ?? "";

  const { searchedChefs } = await searchRecipesAndChefs(searchQuery);

  return (
    <>
      <TopBar centerComponent={<SearchInput />} />
      <LinkableTabs tabs={tabs} searchQuery={searchQuery}>
        <>
          <p className="px-4 pt-5 text-xl font-bold text-mauve12">
            {searchQuery ? `「${searchQuery}」で検索` : "シェフ一覧"}
          </p>
          {searchedChefs.length > 0 ? (
            <ChefTileList chefs={searchedChefs} />
          ) : (
            <NoDataDisplay text={"お探しのシェフが見つかりませんでした。"} />
          )}
        </>
      </LinkableTabs>
    </>
  );
};

export default page;
