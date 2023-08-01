"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { ActionsResult } from "../types/ActionsResult";
import { Database } from "../types/SupabaseTypes";

export const postMemo = async (formData: FormData): Promise<ActionsResult> => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

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
