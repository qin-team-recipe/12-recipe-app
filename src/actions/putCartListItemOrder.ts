"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const putCartListItemOrder = async ({
  sourceCartListItemId,
  targetCartListItemId,
}: {
  sourceCartListItemId: number;
  targetCartListItemId: number;
}): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  try {
    const sourceCartListItem = await prisma.cartListItem.findUnique({
      where: { id: sourceCartListItemId },
      select: { order: true, cartListId: true },
    });

    const targetCartListItem = await prisma.cartListItem.findUnique({
      where: { id: targetCartListItemId },
      select: { order: true, cartListId: true },
    });

    if (!sourceCartListItem || !targetCartListItem) {
      throw new Error("Source or target cartListItem not found.");
    }

    if (sourceCartListItem.order < targetCartListItem.order) {
      await prisma.cartListItem.updateMany({
        where: {
          cartListId: targetCartListItem.cartListId,
          order: {
            gt: sourceCartListItem.order,
            lte: targetCartListItem.order,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });
    } else {
      await prisma.cartListItem.updateMany({
        where: {
          cartListId: targetCartListItem.cartListId,
          order: {
            gte: targetCartListItem.order,
            lt: sourceCartListItem.order,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }

    await prisma.cartListItem.update({
      where: { id: sourceCartListItemId },
      data: { order: targetCartListItem.order },
    });

    revalidatePath("/shopping-list");

    return {
      isSuccess: true,
      message: "材料の順序を更新しました🎉",
    };
  } catch (error) {
    console.error("Error updating cartListItem order:", error);
    return {
      isSuccess: false,
      error: "材料の順序の更新に失敗しました🥲",
    };
  }
};
