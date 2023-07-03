"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

const doneMemo = async (id: number, isCompleted: boolean) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("認証に失敗しました");
  }

  // 論理削除
  await prisma.memo.update({
    data: {
      isCompleted: !isCompleted,
    },
    where: { id },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};

export default doneMemo;
