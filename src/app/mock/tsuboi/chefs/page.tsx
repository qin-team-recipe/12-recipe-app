import Link from "next/link";

import { searchRecipesAndChefs } from "@/src/actions/searchRecipesAndChefs";
import TopBar from "@/src/components/layout/top-bar";
import SearchInput from "@/src/components/search-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

const page = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const searchQuery = searchParams.search ?? "";

  const { searchedChefs } = await searchRecipesAndChefs(searchQuery);

  return (
    <div className="p-2">
      <Separator className="my-2" />
      <h2 className="pt-2 text-2xl font-extrabold">シェフ一覧</h2>
      <TopBar centerComponent={<SearchInput />} />
      {searchedChefs && searchedChefs.length > 0 && (
        <div className="grid grid-cols-2 gap-4 px-2 pt-4">
          {searchedChefs.map((chef) => (
            <div key={chef.id} className="flex flex-col gap-2">
              <Link href={`/mock/tsuboi/chefs/${chef.id}`}>
                <Card className="w-full lg:max-w-md">
                  <CardHeader>
                    <CardTitle>{chef.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>レシピ数：{chef._count.Recipe}</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      )}
      {searchQuery.length > 0 && searchedChefs.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-4">
          <img
            className="mx-auto mb-4 h-80 w-80"
            src="https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/61bf07d2cce98fb122df3dd3_1.png"
            alt="No result"
          />
          <p className="font-bold text-mauve12">該当する検索結果がありませんでした。</p>
        </div>
      )}
    </div>
  );
};

export default page;
