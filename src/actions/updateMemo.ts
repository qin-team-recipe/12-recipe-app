"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const doneMemo = async (id: number, isCompleted: boolean) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました🥲");
  }

  // 論理削除
  await prisma.memo.update({
    data: {
      isCompleted: !isCompleted,
    },
    where: { id },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};
