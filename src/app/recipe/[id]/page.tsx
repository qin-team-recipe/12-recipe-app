import { getRecipeById } from "@/src/actions/getRecipeById";
import { RecipeStep } from "@/src/components/recipe-step";

const page = async ({ params }: { params: { id: string } }) => {
  const { Instruction: instructions } = await getRecipeById(params.id);

  return (
    <div className="flex flex-col">
      {instructions.map((instruction) => (
        <RecipeStep key={instruction.id} stepNumber={instruction.stepOrder} recipeText={instruction.stepDescription} />
      ))}
    </div>
  );
};

export default page;
