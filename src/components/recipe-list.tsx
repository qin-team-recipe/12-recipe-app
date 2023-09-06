import { getMyRecipes } from "@/src/actions/getMyRecipes";

import RecipeCard from "@/src/components/recipe-card";

import { ResolveReturnType } from "../types/utilityTypes";

type Props = {
  recipes: ResolveReturnType<typeof getMyRecipes>;
  path: string;
};

const RecipeList = ({ recipes, path }: Props) => {
  return (
    <>
      {recipes.map(({ id, _count, description, title, isPublished, RecipeImage }) => (
        <li key={id} className="flex flex-col">
          <RecipeCard
            path={`/${path}/${id}`}
            favorites={_count.likes}
            description={description}
            isPublished={isPublished}
            title={title}
            imageUrl={RecipeImage[0].recipeImage}
          />
        </li>
      ))}
    </>
  );
};

export default RecipeList;
