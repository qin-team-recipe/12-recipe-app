import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";

export const searchRecipesAndChefs = async (searchQuery: string, { skip, limit }: PaginationParams = {}) => {
  const search = searchQuery.toLowerCase();

  const [filteredRecipes, filteredChefs] = await Promise.all([
    prisma.recipe.findMany({
      include: {
        RecipeImage: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      skip,
      take: limit,
    }),
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        profile: true,
        profileImage: true,
        _count: {
          select: {
            Recipe: true,
          },
        },
      },
      where: {
        role: "CHEF",
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      orderBy: {
        name: "desc",
      },
      skip,
      take: limit,
    }),
  ]);

  const [totalRecipes, totalChefs] = await Promise.all([
    prisma.recipe.count({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    }),
    prisma.user.count({
      where: {
        role: "CHEF",
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    }),
  ]);

  return {
    searchedRecipes: filteredRecipes,
    searchedChefs: filteredChefs,
    totalRecipes,
    totalChefs,
  };
};
