"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { ActionsResult } from "../types/ActionsResult";
import { Database } from "../types/SupabaseTypes";

export const putMemo = async (id: number, isCompleted: boolean): Promise<ActionsResult> => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) notFound();

  try {
    // 論理削除
    await prisma.memo.update({
      data: {
        isCompleted: !isCompleted,
      },
      where: { id },
    });

    // TODO: 適切なパスを指定する
    revalidatePath("/mock");

    return {
      isSuccess: true,
      message: "メモを完了しました🎉",
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "メモの完了に失敗しました🥲",
    };
  }
};
