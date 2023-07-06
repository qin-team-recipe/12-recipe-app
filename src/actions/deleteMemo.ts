"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

export const deleteMemo = async (id: number) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("認証に失敗しました");
  }

  // 論理削除
  await prisma.memo.update({
    data: {
      deletedAt: new Date(),
    },
    where: { id },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};
