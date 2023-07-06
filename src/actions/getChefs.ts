import { prisma } from "../lib/prisma";

export const getChefs = async () => {
  const chefs = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      profile: true,
      profileImage: true,
      _count: {
        select: {
          Recipe: true,
        },
      },
    },
    where: {
      role: "CHEF",
    },
    orderBy: {
      name: "desc",
    },
  });

  return chefs;
};
