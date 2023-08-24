import { getRecipeById } from "@/src/actions/getRecipeById";

import { RecipeStep } from "@/src/components/recipe-step";

const page = async ({ params }: { params: { recipeId: string; chefId: string } }) => {
  const { Instruction: instructions } = await getRecipeById(params.recipeId);

  return (
    <div className="flex flex-col">
      {instructions.map((instruction) => (
        <RecipeStep key={instruction.id} stepNumber={instruction.stepOrder} instruction={instruction.stepDescription} />
      ))}
    </div>
  );
};

export default page;
