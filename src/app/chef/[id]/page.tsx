import React from "react";

import RecipeCard from "@/src/components/recipe-card";
import { recipeCardLists } from "@/src/constants/dummy/recipe-card-lists";

const page = () => {
  return (
    <div className="grid grid-cols-2 p-4 gap-4">
      {recipeCardLists.map((list) => (
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
