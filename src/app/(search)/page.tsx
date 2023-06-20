import { ChefCard } from "@/src/components/chef-card";
import TopBar from "@/src/components/layout/top-bar";
import RecipeCard from "@/src/components/recipe-card";
import { Button } from "@/src/components/ui/button";

const page = () => {
  return (
    <>
      <TopBar
      // TODO: centerComponentを検索バーにする
      />
      <div className="p-8">
        <Button>Search</Button>
        {/* map処理をして横スクロールできるようにする */}
        <ChefCard
          routingUrl="/"
          imageUrl="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          imageText="山田シェフ"
        />
        {/* map処理をして横スクロールできるようにする */}
        <div className="h-52 w-40 flex gap-4">
          <RecipeCard
            imageUrl={"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"}
            recipeName={"レシピ名レシピ名レシピ名レシピ名レシピ名レシピ名レシピ名レシピ名レシピ名"}
            comment={"コメントコメントコメントコメントコメントコメントコメントコメントコメントコメント"}
            recipeId={1}
            favorites={2}
          />
        </div>
      </div>
    </>
  );
};

export default page;
