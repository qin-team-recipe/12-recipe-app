"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const postMemo = async (formData: FormData): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  const title = String(formData.get("title"));

  try {
    await prisma.memo.create({
      data: {
        userId: session.user.id,
        title,
      },
    });

    return {
      isSuccess: true,
      message: "メモを作成しました🎉",
    };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "メモの作成に失敗しました🥲" };
  }
};
