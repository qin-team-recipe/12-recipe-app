"use server";

import { prisma } from "../lib/prisma";

export const deleteCartList = async (cartListId: number) => {
  try {
    await prisma.cartList.delete({
      where: {
        id: cartListId,
      },
    });
    return {
      isSuccess: true,
      error: "リストからレシピを削除しました。",
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "レシピの削除処理に失敗しました。",
    };
  }
};
