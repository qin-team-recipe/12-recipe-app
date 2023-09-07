"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const postCartListItem = async (cartListId: number): Promise<ActionsResult & { id?: number }> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  try {
    const cartListItem = await prisma.cartListItem.create({
      data: {
        cartListId,
        title: "",
        order: (await prisma.cartListItem.count({ where: { cartListId } })) + 1,
        isCustom: true,
      },
    });

    return {
      isSuccess: true,
      message: "カートリストアイテムを作成しました🎉",
      id: cartListItem.id,
    };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "カートリストアイテムの作成に失敗しました🥲" };
  }
};
