"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";

export const deleteChefs = async (chefIds: string[]): Promise<ActionsResult> => {
  try {
    await Promise.all(
      chefIds.map(async (id) => {
        await prisma.$transaction([
          prisma.cartList.deleteMany({
            where: {
              userId: id,
            },
          }),
          prisma.favorite.deleteMany({
            where: {
              userId: id,
            },
          }),
          prisma.userFollower.deleteMany({
            where: {
              followerId: id,
            },
          }),
          prisma.userFollower.deleteMany({
            where: {
              followedId: id,
            },
          }),
          prisma.userLink.deleteMany({
            where: {
              userId: id,
            },
          }),
          prisma.memo.deleteMany({
            where: {
              userId: id,
            },
          }),
          prisma.recipe.deleteMany({
            where: {
              userId: id,
            },
          }),
          prisma.user.delete({
            where: {
              id,
            },
          }),
        ]);
      })
    );

    revalidatePath("/admin");

    return { isSuccess: true, message: "指定のシェフを削除しました🔥" };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "シェフの削除に失敗しました🥲" };
  }
};
