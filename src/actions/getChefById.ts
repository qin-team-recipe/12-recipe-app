import { prisma } from "../lib/prisma";
import getAuthenticatedUser from "./getAuthenticatedUser";

const getChefById = async (id: string) => {
  const chef = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      Recipe: true,
      followers: true,
      UserLink: true,
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

  return {
    ...chef,
    followersCount,
    isFollowing: isFollowing,
  };
};

export default getChefById;
