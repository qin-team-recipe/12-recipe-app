import { prisma } from "../lib/prisma";

const getRecipes = async () => {
  const recipe = await prisma.recipe.findMany({
    include: {
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return recipe;
};

export default getRecipes;
