import { ChefCard } from "@/src/components/chef-card";
import { ChefTile } from "@/src/components/chef-tile";
import TopBar from "@/src/components/layout/top-bar";
import RecipeCard from "@/src/components/recipe-card";
import { RecipeStep } from "@/src/components/recipe-step";
import SearchInput from "@/src/components/search-input";
import { Button } from "@/src/components/ui/button";

const page = () => {
  return (
    <>
      <TopBar centerComponent={<SearchInput />} />
      <div className="flex flex-col gap-3">
        <Button className="w-fit">Search</Button>
        {/* map処理をして横スクロールできるようにする */}
        <ChefCard
          routingUrl="/chef/1"
          imageUrl="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          imageText="山田シェフ"
        />
        {/* map処理をして横スクロールできるようにする */}
        <div className="flex h-56 w-40 gap-4">
          <RecipeCard
            path="/recipe/1"
            imageUrl={
              "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
            }
            title={"レシピ名レシピ名レシピ名レシピ名レシピ名レシピ名レシピ名レシピ名レシピ名"}
            description={"コメントコメントコメントコメントコメントコメントコメントコメントコメントコメント"}
            favorites={2}
          />
        </div>
        <RecipeStep
          recipeText="用意するメインの材料は、マカロニ、牛乳、鶏もも肉、玉ねぎ、椎茸で、バター、小麦粉、塩、こしょうも使用します。"
          stepNumber={1}
        />
        <ChefTile
          routingUrl="/chef/1"
          imageUrl={
            "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
          }
          chefName={"ひふみシェフ"}
          bio={
            "白ごはん.comを運営しています。アップしたレシピの紹介や、youtube動画、日々の食のこと、オリジナル商品の案内等をブログでやっています。"
          }
          id="1"
          recipeCount={123}
        />
      </div>
    </>
  );
};

export default page;
