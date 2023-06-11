import { ChefCard } from "@/src/components/chef-card";
import RecipeCard from "@/src/components/recipe-card";
import { Button } from "@/src/components/ui/button";

const page = () => {
  return (
    <div>
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
          imageHeight="h-40"
          textWidth="w-40"
          favorites={2}
        />
      </div>
    </div>
  );
};

export default page;
