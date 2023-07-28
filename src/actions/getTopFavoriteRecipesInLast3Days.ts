import { addDays } from "date-fns";

import { prisma } from "../lib/prisma";

export const getTopFavoriteRecipesInLast3Days = async () => {
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
    take: 10,
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

  const recipesWithLikeCount = recipes.map((recipe) => ({
    ...recipe,
    likeCount: recipe.likes.length,
  }));

  return recipesWithLikeCount;
};
