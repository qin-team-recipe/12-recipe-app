import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { kInfiniteScrollCount } from "../constants/constants";
import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";
import { Database } from "../types/SupabaseTypes";

export const getMyFavoriteRecipes = async (
  { skip, limit }: PaginationParams = {
    skip: 0,
    limit: kInfiniteScrollCount,
  }
) => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) notFound();

  const favoriteRecipes = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      recipe: {
        include: {
          _count: {
            select: {
              likes: true,
            },
          },
          RecipeImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });

  return favoriteRecipes.map((favoriteRecipe) => favoriteRecipe.recipe);
};
