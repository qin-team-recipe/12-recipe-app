import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { PaginationParams } from "../types/PaginationParams";

export const getChefById = async (
  { id, orderByLikes, limit, skip }: { id: string; orderByLikes?: boolean } & PaginationParams = {
    id: "",
    orderByLikes: false,
    skip: 0,
    limit: undefined,
  }
) => {
  const chef = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Recipe: {
        include: {
          _count: {
            select: {
              likes: true,
              RecipeImage: true,
            },
          },
          RecipeImage: {
            select: {
              recipeImage: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      },
      followers: true,
      UserLink: true,
      _count: {
        select: {
          Recipe: true,
          followers: true,
        },
      },
    },
  });

  if (!chef) notFound();

  if (orderByLikes) {
    chef.Recipe.sort((a, b) => (b._count.likes || 0) - (a._count.likes || 0));
  }

  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  // シェフのフォロワー数を取得
  const followersCount = await prisma.userFollower.count({
    where: {
      followedId: id,
    },
  });

  // 現在のユーザーがシェフをフォローしているかどうかを確認
  const isFollowing = session
    ? Boolean(
        await prisma.userFollower.findUnique({
          where: {
            followerId_followedId: {
              followerId: session.user.id,
              followedId: id,
            },
          },
        })
      )
    : false;

  // 取得するシェフが自分自身であるかどうかを確認
  const isMe = session ? session.user.id === chef.id : false;

  return {
    ...chef,
    followersCount,
    isFollowing,
    isMe,
    Recipe: chef.Recipe.map((recipe) => ({
      ...recipe,
      likesCount: recipe._count.likes,
    })),
  };
};
