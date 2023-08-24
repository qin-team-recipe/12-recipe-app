import { getRecipeById } from "@/src/actions/getRecipeById";

import { EditRecipeForm, EditRecipeFormValues } from "@/src/components/edit-recipe-form";
import TopBar from "@/src/components/layout/top-bar";

const page = async ({ params }: { params: { recipeId: string; chefId: string } }) => {
  const {
    id,
    title,
    description,
    servingCount,
    Ingredient: ingredients,
    Instruction: instructions,
    RecipeImage: recipeImage,
    RecipeLink: recipeLinks,
  } = await getRecipeById(params.recipeId);

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
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">レシピの編集</h1>} />
      <EditRecipeForm defaultValues={defaultValues} navigateTo={`/admin/${params.chefId}/recipe/${params.recipeId}`} />
    </>
  );
};

export default page;
