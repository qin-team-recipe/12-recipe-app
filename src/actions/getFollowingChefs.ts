import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

export const getFollowingChefs = async () => {
  const authenticatedUser = await getAuthenticatedUser();

  if (!authenticatedUser) throw new Error("認証に失敗しました🥲");

  const followingChefs = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      profileImage: true,
    },
    where: {
      role: "CHEF",
      followers: {
        some: {
          followerId: authenticatedUser.id,
        },
      },
    },
    orderBy: {
      name: "desc",
    },
  });

  return followingChefs;
};
