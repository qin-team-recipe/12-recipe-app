"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const putMemoOrder = async ({
  sourceMemoId,
  targetMemoId,
}: {
  sourceMemoId: number;
  targetMemoId: number;
}): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/favorite");

  try {
    const sourceMemo = await prisma.memo.findUnique({
      where: { id: sourceMemoId },
      select: { order: true },
    });

    const targetMemo = await prisma.memo.findUnique({
      where: { id: targetMemoId },
      select: { order: true },
    });

    if (!sourceMemo || !targetMemo) {
      throw new Error("Source or target memo not found.");
    }

    if (sourceMemo.order < targetMemo.order) {
      await prisma.memo.updateMany({
        where: {
          userId: session.user.id,
          order: {
            gt: sourceMemo.order,
            lte: targetMemo.order,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });
    } else {
      await prisma.memo.updateMany({
        where: {
          userId: session.user.id,
          order: {
            gte: targetMemo.order,
            lt: sourceMemo.order,
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }

    await prisma.memo.update({
      where: { id: sourceMemoId },
      data: { order: targetMemo.order },
    });

    revalidatePath("/shopping-list");

    return {
      isSuccess: true,
      message: "メモの順序を更新しました🎉",
    };
  } catch (error) {
    console.error("Error updating memo order:", error);
    return {
      isSuccess: false,
      error: "メモの順序の更新に失敗しました🥲",
    };
  }
};
