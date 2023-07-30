import { prisma } from "../lib/prisma";

export const getDraftRecipe = async (id: string) => {
  const draftRecipe = await prisma.draftRecipe.findUnique({
    where: {
      id,
    },
    include: {
      DraftIngredient: true,
      DraftInstruction: true,
      DraftRecipeImage: true,
      DraftRecipeLink: true,
    },
  });

  return draftRecipe;
};
