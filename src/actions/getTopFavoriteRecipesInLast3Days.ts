import { addDays } from "date-fns";

import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";

export const getTopFavoriteRecipesInLast3Days = async ({ limit, skip }: PaginationParams) => {
  const threeDaysAgo = addDays(new Date(), -3);

  const favorites = await prisma.favorite.groupBy({
    by: ["recipeId"],
    where: {
      createdAt: {
        gte: threeDaysAgo,
      },
    },
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        recipeId: "desc",
      },
    },
    skip,
    take: limit || undefined,
  });

  const recipeIds = favorites.map((favorite) => favorite.recipeId);

  const recipes = await prisma.recipe.findMany({
    where: {
      id: {
        in: recipeIds,
      },
    },
    include: {
      RecipeImage: true,
      likes: true,
    },
  });

  recipes.sort((a, b) => recipeIds.indexOf(a.id) - recipeIds.indexOf(b.id));

  return recipes.map((recipe) => ({
    ...recipe,
    likeCount: recipe.likes.length,
  }));
};
