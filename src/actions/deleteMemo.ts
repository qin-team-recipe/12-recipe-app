"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { ActionsResult } from "../types/ActionsResult";

export const deleteMemo = async (id: number): Promise<ActionsResult> => {
  try {
    // 論理削除
    await prisma.memo.update({
      data: {
        deletedAt: new Date(),
      },
      where: { id },
    });

    // TODO: 適切なパスを指定する
    revalidatePath("/mock");

    return {
      isSuccess: true,
      message: "メモを削除しました🔥",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: "メモの削除に失敗しました🥲",
    };
  }
};
