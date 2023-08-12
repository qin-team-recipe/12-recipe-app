import { getChefs } from "@/src/actions/getChefs";
import { getRecipesTopFavoritesInLast3Days } from "@/src/actions/getRecipesTopFavoritesInLast3Days";
import { kInfiniteScrollCount } from "@/src/constants/constants";
import { prisma } from "@/src/lib/prisma";
import { PaginationParams } from "@/src/types/PaginationParams";

export const searchRecipesAndChefs = async (
  searchQuery: string,
  { skip, limit }: PaginationParams = {
    skip: 0,
    limit: kInfiniteScrollCount,
  }
) => {
  if (!searchQuery) {
    const topFavoriteRecipes = await getRecipesTopFavoritesInLast3Days({ limit, skip });

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
