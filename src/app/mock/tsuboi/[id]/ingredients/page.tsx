import { getRecipeById } from "@/src/actions/getRecipeById";
import LinkableTabs from "@/src/components/linkable-tabs";

import RecipeHero from "../_components/recipe-hero";
import { tabs } from "../_constants/tabs";

const page = async ({ params }: { params: { id: string } }) => {
  const { Ingredient: ingredients, servingCount } = await getRecipeById(params.id);

  return (
    <div className="mb-20">
      <RecipeHero id={params.id} />
      <LinkableTabs tabs={tabs(params.id)}>
        <div className="flex flex-col gap-2 p-4">
          <h2 className="text-xl font-bold">{servingCount}人前</h2>
          <div className="flex flex-col">
            {ingredients.map(({ title }) => (
              <div>{title}</div>
            ))}
          </div>
        </div>
      </LinkableTabs>
    </div>
  );
};

export default page;
