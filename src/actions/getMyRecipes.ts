import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { PaginationParams } from "@/src/types/PaginationParams";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getMyRecipes = async (
  { orderByLikes, limit, skip }: { orderByLikes?: boolean } & PaginationParams = {
    orderByLikes: false,
    skip: 0,
    limit: undefined,
  }
) => {
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
