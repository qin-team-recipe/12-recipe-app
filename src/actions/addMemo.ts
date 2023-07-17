"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const addMemo = async (formData: FormData) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const title = String(formData.get("title"));

  await prisma.memo.create({
    data: {
      userId: session.user.id,
      title,
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};
