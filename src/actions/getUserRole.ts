"use server";

import { prisma } from "@/src/lib/prisma";

export const getUserRole = async (id: string | undefined) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user?.role;
};
