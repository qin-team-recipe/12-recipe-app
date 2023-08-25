import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { kInfiniteScrollCount } from "@/src/constants/constants";
import { prisma } from "@/src/lib/prisma";
import { PaginationParams } from "@/src/types/PaginationParams";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getRecipesInMyFavorites = async (
  { skip, limit }: PaginationParams = {
    skip: 0,
    limit: kInfiniteScrollCount,
  }
) => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) notFound();

  const favoriteRecipes = await prisma.favorite.findMany({
    where: {
      userId: session.user.id,
      recipe: {
        // マイレシピは非公開のものも含めて取得する
        OR: [{ isPublished: true }, { userId: session.user.id }],
      },
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
