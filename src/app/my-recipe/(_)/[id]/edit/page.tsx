import { getRecipeById } from "@/src/actions/getRecipeById";

import TopBar from "@/src/components/layout/top-bar";

import { EditRecipeForm, EditRecipeFormValues } from "./_components/edit-recipe-form";

const page = async ({ params }: { params: { id: string } }) => {
  const {
    id,
    title,
    description,
    servingCount,
    Ingredient: ingredients,
    Instruction: instructions,
    RecipeImage: recipeImage,
    RecipeLink: recipeLinks,
  } = await getRecipeById(params.id);

  const defaultValues: Partial<EditRecipeFormValues> = {
    recipeId: id,
    title,
    bio: description,
    servingCount,
    ingredients: ingredients.map((ingredient) => {
      return {
        id: ingredient.id,
        name: ingredient.title,
      };
    }),
    recipeImage: recipeImage[0].recipeImage,
    instructions: instructions.map((instruction) => {
      return {
        value: String(instruction.stepDescription),
        id: instruction.id,
        order: instruction.stepOrder,
      };
    }),
    urls: recipeLinks.map((link) => {
      return {
        value: link.linkUrl,
        id: link.id,
      };
    }),
  };

  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">マイレシピの編集</h1>} />
      <EditRecipeForm defaultValues={defaultValues} />
    </>
  );
};

export default page;
