import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";

const getRecipes = async ({ offset = 0, limit = 10 }: PaginationParams = {}) => {
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
    skip: offset,
    take: limit,
  });

  return recipe;
};

export default getRecipes;
