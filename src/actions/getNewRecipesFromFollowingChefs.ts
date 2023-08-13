import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { kInfiniteScrollCount } from "../constants/constants";
import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";
import { Database } from "../types/SupabaseTypes";

export const getNewRecipesFromFollowingChefs = async (
  { limit, skip }: PaginationParams = {
    skip: 0,
    limit: kInfiniteScrollCount,
  }
) => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) notFound();

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
    skip,
    take: limit || undefined,
  });

  return newRecipesFromFollowingChefs;
};
