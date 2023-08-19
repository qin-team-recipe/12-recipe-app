import { getRecipeById } from "@/src/actions/getRecipeById";
import { RecipeStep } from "@/src/components/recipe-step";

type Props = {
  id: string;
};

const InstructionList = async ({ id }: Props) => {
  const { Instruction } = await getRecipeById(id);

  return (
    <div className="flex flex-col">
      {Instruction.map((instruction) => (
        <RecipeStep key={instruction.id} stepNumber={instruction.stepOrder} instruction={instruction.stepDescription} />
      ))}
    </div>
  );
};

export default InstructionList;
