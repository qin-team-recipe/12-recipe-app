import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";
import { Database } from "../types/SupabaseTypes";

export const getMyRecipes = async ({ orderByLikes }: { orderByLikes: boolean }, { limit, skip }: PaginationParams) => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) redirect("/login");

  const myRecipe = await prisma.recipe.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      RecipeImage: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: orderByLikes
      ? [
          {
            likes: {
              _count: "desc",
            },
          },
          {
            createdAt: "desc",
          },
        ]
      : {
          createdAt: "desc",
        },
    skip,
    take: limit,
  });

  return myRecipe;
};
