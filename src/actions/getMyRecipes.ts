import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

const getMyRecipes = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return null;
  }

  const myRecipe = await prisma.recipe.findMany({
    where: {
      userId: user.id,
      deletedAt: null,
    },
    include: {
      RecipeImage: true,
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return myRecipe;
};

export default getMyRecipes;
