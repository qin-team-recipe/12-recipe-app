import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

const getMemos = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return [];
  }

  const memos = await prisma.memo.findMany({
    select: {
      id: true,
      userId: true,
      title: true,
      isCompleted: true,
    },
    where: {
      userId: user.id,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return memos;
};

export default getMemos;
