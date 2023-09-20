"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "../types/SupabaseTypes";

export const deleteCartListItem = async ({
  cartListId,
  cartListItemId,
}: {
  cartListId: number;
  cartListItemId: number;
}): Promise<ActionsResult> => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) redirect("/login");

  try {
    const cartList = await prisma.cartList.findFirst({
      where: {
        id: cartListId,
        userId: session.user.id,
      },
      include: {
        CartListItem: true,
      },
    });

    const isNotfoundRecipeInCartList = cartList === null;

    if (isNotfoundRecipeInCartList) {
      return { isSuccess: false, error: "指定のカートリストが見つかりませんでした🥲" };
    }

    const cartListItemSize = await prisma.cartListItem.count({
      where: {
        cartListId: cartList.id,
      },
    });

    if (cartListItemSize === 1) {
      await prisma.cartList.delete({
        where: {
          id: cartList.id,
        },
      });
    } else {
      await prisma.cartListItem.delete({
        where: {
          id: cartListItemId,
        },
      });
    }

    revalidatePath("/shopping-list");

    return { isSuccess: true, message: "指定のカートリストアイテムを削除しました🔥" };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "カートリストアイテムの削除に失敗しました🥲" };
  }
};
