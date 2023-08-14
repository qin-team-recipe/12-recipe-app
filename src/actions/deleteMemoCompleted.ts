"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "../types/SupabaseTypes";

export const deleteMemoCompleted = async (): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  try {
    // 完了したメモを削除
    await prisma.memo.deleteMany({
      where: {
        isCompleted: true,
        userId: session.user.id,
      },
    });

    // 残りのメモのorderを更新
    const remainingMemos = await prisma.memo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        order: "asc",
      },
    });

    for (let i = 0; i < remainingMemos.length; i++) {
      await prisma.memo.update({
        where: { id: remainingMemos[i].id },
        data: { order: i + 1 },
      });
    }

    revalidatePath("/shopping-list");

    return {
      isSuccess: true,
      message: "完了したメモを削除しました🔥",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: "メモの削除に失敗しました🥲",
    };
  }
};
