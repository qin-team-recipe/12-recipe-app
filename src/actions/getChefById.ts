import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getChefById = async (id: string) => {
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
            },
          },
        },
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

  if (!chef) throw new Error(`シェフが見つかりませんでした🥲 ID:${id}`);

  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました🥲");
  }

  // シェフのフォロワー数を取得
  const followersCount = await prisma.userFollower.count({
    where: {
      followedId: id,
    },
  });

  // 現在のユーザーがシェフをフォローしているかどうかを確認
  const isFollowing = Boolean(
    await prisma.userFollower.findUnique({
      where: {
        followerId_followedId: {
          followerId: session.user.id,
          followedId: id,
        },
      },
    })
  );

  // 取得するシェフが自分自身であるかどうかを確認
  const isMe = session.user.id === chef.id;

  return {
    ...chef,
    followersCount,
    isFollowing: isFollowing,
    isMe: isMe,
    Recipe: chef.Recipe.map((recipe) => ({
      ...recipe,
      likesCount: recipe._count.likes,
    })),
  };
};
