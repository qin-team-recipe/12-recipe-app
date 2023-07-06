import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";
import { getChefs } from "./getChefs";
import { getRecipes } from "./getRecipes";

export const searchRecipesAndChefs = async (searchQuery: string, { offset = 0, limit = 10 }: PaginationParams = {}) => {
  const search = searchQuery.toLowerCase();

  const [filteredRecipes, filteredChefs] = await Promise.all([
    prisma.recipe.findMany({
      include: {
        RecipeImage: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        OR: [
          {
            title: {
              contains: search,
              // 大文字小文字を区別しないようにする
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              // 大文字小文字を区別しないようにする
              mode: "insensitive",
            },
          },
        ],
      },
      skip: offset,
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
        OR: [
          {
            name: {
              contains: search,
              // 大文字小文字を区別しないようにする
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        name: "desc",
      },
      skip: offset,
      take: limit,
    }),
  ]);

  const searchedRecipes = searchQuery.length > 0 ? filteredRecipes : await getRecipes();
  const searchedChefs = searchQuery.length > 0 ? filteredChefs : await getChefs();

  return { searchedRecipes, searchedChefs };
};
