"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const patchCartListItemCompleteStatus = async (id: number, isCompleted: boolean): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  try {
    await prisma.cartListItem.update({
      data: {
        isCompleted: !isCompleted,
      },
      where: { id },
    });

    revalidatePath("/shopping-list");

    return {
      isSuccess: true,
      message: "カートリストアイテムを完了しました🎉",
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "カートリストアイテムの完了に失敗しました🥲",
    };
  }
};
