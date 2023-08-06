import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";
import { Database } from "../types/SupabaseTypes";

export const getNewRecipesFromFollowingChefs = async ({ limit, skip }: PaginationParams) => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) redirect("/login");

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
