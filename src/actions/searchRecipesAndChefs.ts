import { kInfiniteScrollCount } from "../constants/constants";
import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";
import { getChefs } from "./getChefs";
import { getTopFavoriteRecipesInLast3Days } from "./getTopFavoriteRecipesInLast3Days";

export const searchRecipesAndChefs = async (
  searchQuery: string,
  { skip, limit }: PaginationParams = {
    skip: 0,
    limit: kInfiniteScrollCount,
  }
) => {
  if (!searchQuery) {
    const topFavoriteRecipes = await getTopFavoriteRecipesInLast3Days({ limit, skip });

    const { chefs } = await getChefs();

    return {
      searchedRecipes: topFavoriteRecipes.map((recipe) => ({
        ...recipe,
        _count: {
          likes: recipe.likeCount,
        },
      })),
      searchedChefs: chefs,
      totalRecipes: topFavoriteRecipes.length,
      totalChefs: 0,
    };
  }

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
        user: {
          role: "CHEF",
        },
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
        user: {
          role: "CHEF",
        },
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
