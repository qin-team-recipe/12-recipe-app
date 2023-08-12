"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const patchMemoTitle = async (id: number, title: string): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  try {
    await prisma.memo.update({
      data: {
        title,
      },
      where: { id },
    });

    revalidatePath("/shopping");

    return {
      isSuccess: true,
      message: "メモを更新しました🎉",
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "メモの更新に失敗しました🥲",
    };
  }
};
