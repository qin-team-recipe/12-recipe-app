import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getMyRecipes = async ({ orderByLikes }: { orderByLikes: boolean }) => {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  if (orderByLikes) {
    myRecipe.sort((a, b) => (b._count.likes || 0) - (a._count.likes || 0));
  }

  return myRecipe;
};
