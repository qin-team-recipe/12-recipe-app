import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getRecipeById = async (id: string) => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    redirect("/mock/unauthenticated");
  }

  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      Instruction: true,
      Ingredient: true,
      RecipeImage: true,
      RecipeLink: true,
    },
  });

  if (!recipe) throw new Error(`レシピが見つかりませんでした🥲 ID:${id}`);

  const user = await prisma.user.findUnique({
    where: {
      id: recipe?.userId,
    },
    select: {
      id: true,
      name: true,
      profileImage: true,
    },
  });

  if (!user) throw new Error(`ユーザーが見つかりませんでした🥲 ID:${recipe?.userId}`);

  const isMe = recipe.userId === session.user.id;

  return {
    ...recipe,
    user,
    isMe,
  };
};
