import { prisma } from "../lib/prisma";

export const getRecipeById = async (id: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      Instruction: true,
      Ingredient: true,
      RecipeImage: true,
      RecipeLink: true,
    },
  });

  if (!recipe) throw new Error(`レシピが見つかりませんでした🥲 ID:${id}`);

  const user = await prisma.user.findUnique({
    where: {
      id: recipe?.userId,
    },
    select: {
      id: true,
      name: true,
      profileImage: true,
    },
  });

  if (!user) throw new Error(`ユーザーが見つかりませんでした🥲 ID:${recipe?.userId}`);

  return {
    ...recipe,
    user,
  };
};
