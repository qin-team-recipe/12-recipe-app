import { prisma } from "../lib/prisma";
import { PaginationParams } from "../types/PaginationParams";

export const getChefs = async ({ skip = 0, limit = 10 }: PaginationParams = {}) => {
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
    skip,
    take: limit,
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
