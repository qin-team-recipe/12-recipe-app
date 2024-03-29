import { prisma } from "@/src/lib/prisma";

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

  const totalChefs = await prisma.user.count({
    where: {
      role: "CHEF",
    },
  });

  return {
    chefs,
    totalChefs,
  };
};
