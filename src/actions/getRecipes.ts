import { kInfiniteScrollCount } from "../constants/constants";
import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";

export const getRecipes = async (
  { skip, limit }: PaginationParams = {
    skip: 0,
    limit: kInfiniteScrollCount,
  }
) => {
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
