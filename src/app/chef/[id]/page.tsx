import RecipeCard from "@/src/components/recipe-card";
import { recipeLists } from "@/src/constants/dummy/recipe-lists";

const page = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {recipeLists.map((list) => (
        <RecipeCard
          imageUrl={list.imageUrl}
          title={list.recipeName}
          description={list.comment}
          id={list.recipeId}
          favorites={list.favorites}
        />
      ))}
    </div>
  );
};

export default page;
