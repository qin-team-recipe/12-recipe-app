import { kInfiniteScrollCount } from "@/src/constants/constants";
import { prisma } from "@/src/lib/prisma";
import { PaginationParams } from "@/src/types/PaginationParams";

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
    where: {
      user: {
        role: "CHEF",
      },
    },
    skip,
    take: limit,
  });

  return recipe;
};
