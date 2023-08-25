import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getRecipeById = async (id: string) => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) notFound();

  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      Instruction: true,
      Ingredient: true,
      RecipeImage: true,
      RecipeLink: true,
      user: {
        select: {
          id: true,
          name: true,
          profileImage: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!recipe) notFound();

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

  const isFavorite = Boolean(
    await prisma.favorite.findUnique({
      where: {
        userId_recipeId: {
          recipeId: id,
          userId: session.user.id,
        },
      },
    })
  );

  const isMe = recipe.userId === session.user.id;

  return {
    ...recipe,
    user,
    isMe,
    isFavorite,
  };
};
