import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getFavoriteRecipes = async () => {
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
      recipe: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return favoriteRecipes;
};
