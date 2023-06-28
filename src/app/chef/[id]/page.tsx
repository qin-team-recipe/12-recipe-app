import React from "react";

import RecipeCard from "@/src/components/recipe-card";
import { recipeLists } from "@/src/constants/dummy/recipe-lists";

const page = () => {
  return (
    <div className="grid grid-cols-2 p-4 gap-4">
      {recipeLists.map((list) => (
        <RecipeCard
          imageUrl={list.imageUrl}
          recipeName={list.recipeName}
          comment={list.comment}
          recipeId={list.recipeId}
          favorites={list.favorites}
        />
      ))}
    </div>
  );
};

export default page;
