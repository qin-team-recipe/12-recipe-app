import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getMyFavoriteRecipes = async () => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました🥲");
  }

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
  });

  return favoriteRecipes.map((favoriteRecipe) => favoriteRecipe.recipe);
};
