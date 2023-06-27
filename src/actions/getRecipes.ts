import { prisma } from "../lib/prisma";

type GetRecipesParams = {
  page?: number;
  limit?: number;
};

const getRecipes = async ({ page = 1, limit = 10 }: GetRecipesParams = {}) => {
  const recipe = await prisma.recipe.findMany({
    include: {
      RecipeImage: true,
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      deletedAt: null,
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return recipe;
};

export default getRecipes;
