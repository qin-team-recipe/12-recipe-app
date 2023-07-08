import { getRecipeById } from "@/src/actions/getRecipeById";
import LinkableTabs from "@/src/components/linkable-tabs";
import { RecipeStep } from "@/src/components/recipe-step";

import RecipeHero from "./_components/recipe-hero";
import { tabs } from "./_constants/tabs";

const page = async ({ params }: { params: { id: string } }) => {
  const { Instruction } = await getRecipeById(params.id);

  // TODO: レシピ画像の取得

  return (
    <div className="mb-20">
      <RecipeHero id={params.id} />
      <LinkableTabs tabs={tabs(params.id)}>
        <div className="flex flex-col">
          {Instruction.map((instruction) => (
            <RecipeStep
              key={instruction.id}
              stepNumber={instruction.stepOrder}
              recipeText={instruction.stepDescription}
            />
          ))}
        </div>
      </LinkableTabs>
    </div>
  );
};

export default page;
