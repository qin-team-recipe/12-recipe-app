import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";

export const getRecipes = async ({ skip = 0, limit = 10 }: PaginationParams = {}) => {
  const recipe = await prisma.recipe.findMany({
    include: {
      RecipeImage: true,
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });

  return recipe;
};
