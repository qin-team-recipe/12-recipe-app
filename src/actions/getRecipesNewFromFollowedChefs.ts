import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { kInfiniteScrollCount } from "@/src/constants/constants";
import { prisma } from "@/src/lib/prisma";
import { PaginationParams } from "@/src/types/PaginationParams";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getRecipesNewFromFollowedChefs = async (
  { limit, skip }: PaginationParams = {
    skip: 0,
    limit: kInfiniteScrollCount,
  }
) => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

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
