"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "../types/SupabaseTypes";

export const deleteCartListItemCompleted = async (): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  try {
    await prisma.cartListItem.deleteMany({
      where: {
        isCompleted: true,
        AND: {
          cartList: {
            userId: session.user.id,
          },
        },
      },
    });

    const remainingCartListItems = await prisma.cartListItem.findMany({
      where: {
        cartList: {
          userId: session.user.id,
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    for (let i = 0; i < remainingCartListItems.length; i++) {
      await prisma.cartListItem.update({
        where: { id: remainingCartListItems[i].id },
        data: { order: i + 1 },
      });
    }

    revalidatePath("/shopping-list");

    return {
      isSuccess: true,
      message: "完了したカートリストアイテムを削除しました🔥",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: "カートリストアイテムの削除に失敗しました🥲",
    };
  }
};
