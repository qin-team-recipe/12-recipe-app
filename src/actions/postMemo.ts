"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const postMemo = async (): Promise<ActionsResult & { id?: number }> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) notFound();

  try {
    const memo = await prisma.memo.create({
      data: {
        userId: session.user.id,
        title: "",
        order: (await prisma.memo.count({ where: { userId: session.user.id } })) + 1,
      },
    });

    return {
      isSuccess: true,
      message: "メモを作成しました🎉",
      id: memo.id,
    };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "メモの作成に失敗しました🥲" };
  }
};
