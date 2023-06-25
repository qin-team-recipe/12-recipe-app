import TopBar from "@/src/components/layout/top-bar";
import LinkableTabs from "@/src/components/linkable-tabs";
import SearchInput from "@/src/components/search-input";

import { tabs } from "../_constants/tabs";

const page = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const searchQuery = searchParams.search ?? "";

  return (
    <>
      <TopBar centerComponent={<SearchInput />} />
      <LinkableTabs tabs={tabs} searchQuery={searchQuery}>
        <div className="p-2">
          {searchQuery && <div className="text-lg font-bold text-mauve12">「{searchQuery}」で検索</div>}
          <div>シェフ一覧</div>
        </div>
      </LinkableTabs>
    </>
  );
};

export default page;
