import { addDays } from "date-fns";

import { prisma } from "../lib/prisma";

export const getTopFollowersInLast3Days = async () => {
  const threeDaysAgo = addDays(new Date(), -3);

  const followers = await prisma.userFollower.groupBy({
    by: ["followedId"],
    where: {
      createdAt: {
        gte: threeDaysAgo,
      },
    },
    _count: true,
    orderBy: {
      _count: {
        followedId: "desc",
      },
    },
    take: 10,
  });

  const userIds = followers.map((follower) => follower.followedId);

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    include: {
      followed: true,
      followers: true,
    },
  });

  users.sort((a, b) => userIds.indexOf(a.id) - userIds.indexOf(b.id));

  return users;
};
