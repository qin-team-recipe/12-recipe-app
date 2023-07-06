import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

export const getFavoriteRecipes = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return [];
  }

  const favoriteRecipes = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
    include: {
      recipe: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return favoriteRecipes;
};
