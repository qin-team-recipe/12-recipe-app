import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getNewRecipesFromFollowingChefs = async ({ limit }: { limit?: number }) => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました🥲");
  }

  const followingChefs = await prisma.userFollower.findMany({
    where: {
      followerId: session.user.id,
    },
  });

  const followingChefIds = followingChefs.map((chef) => chef.followedId);

  const newRecipesFromFollowingChefs = await prisma.recipe.findMany({
    where: {
      userId: {
        in: followingChefIds,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      RecipeImage: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
    take: limit || undefined,
  });

  return newRecipesFromFollowingChefs;
};
