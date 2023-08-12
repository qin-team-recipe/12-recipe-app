"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "../types/SupabaseTypes";

export const deleteMemoAll = async (): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  try {
    await prisma.memo.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    revalidatePath("/shopping");

    return {
      isSuccess: true,
      message: "すべてのメモを削除しました🔥",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: "メモの削除に失敗しました🥲",
    };
  }
};
