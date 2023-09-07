"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Database } from "@/src//types/SupabaseTypes";
import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const deleteMemoById = async (id: number): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/favorite");

  try {
    await prisma.memo.delete({
      where: {
        id,
      },
    });

    // 削除した以降のメモのorderを更新する
    const memos = await prisma.memo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        order: "asc",
      },
    });

    const updateMemos = memos.map((memo, index) => {
      return prisma.memo.update({
        where: {
          id: memo.id,
        },
        data: {
          order: index + 1,
        },
      });
    });

    await prisma.$transaction(updateMemos);

    revalidatePath("/shopping-list");

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
