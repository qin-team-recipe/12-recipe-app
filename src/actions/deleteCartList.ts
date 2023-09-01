"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { ActionsResult } from "../types/ActionsResult";

export const deleteCartList = async (cartListId: number): Promise<ActionsResult> => {
  try {
    // カスケードで関連するCartListItemも削除される
    await prisma.cartList.delete({
      where: {
        id: cartListId,
      },
    });

    // 削除した以降のカートリストのdisplayOrderを更新する
    const cartList = await prisma.cartList.findMany({
      orderBy: {
        displayOrder: "asc",
      },
    });

    const updateCartList = cartList.map((cart, index) => {
      return prisma.cartList.update({
        where: {
          id: cart.id,
        },
        data: {
          displayOrder: index,
        },
      });
    });

    await prisma.$transaction(updateCartList);

    revalidatePath("/shopping-list");

    return {
      isSuccess: true,
      message: "リストからレシピを削除しました🔥",
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "レシピの削除処理に失敗しました🥲",
    };
  }
};
