import { prisma } from "../lib/prisma";

const getFavoriteRecipes = async (userId: string | undefined) => {
  const favoriteRecipes = await prisma.favorite.findMany({
    where: {
      userId,
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

export default getFavoriteRecipes;
