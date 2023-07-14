"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";

export const deleteMemo = async (id: number) => {
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
