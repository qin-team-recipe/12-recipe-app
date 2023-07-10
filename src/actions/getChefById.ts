import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

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

  const authenticatedUser = await getAuthenticatedUser();

  if (!chef) throw new Error(`シェフが見つかりませんでした🥲 ID:${id}`);

  if (!authenticatedUser) throw new Error("認証に失敗しました🥲");

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
          followerId: authenticatedUser.id,
          followedId: id,
        },
      },
    })
  );

  // 取得するシェフが自分自身であるかどうかを確認
  const isMe = authenticatedUser.id === chef.id;

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
