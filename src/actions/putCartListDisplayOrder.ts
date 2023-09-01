"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export const putCartListDisplayOrder = async ({
  direction,
  displayOrder,
}: {
  direction: "up" | "down";
  displayOrder: number;
}): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  try {
    const cartList = await prisma.cartList.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });

    const targetIndex = cartList.findIndex((cart) => cart.displayOrder === displayOrder);

    if (direction === "up") {
      if (targetIndex === 0) {
        return {
          isSuccess: false,
          error: "一番上のカートリストは上に移動できません🥲",
        };
      }
      const targetCart = cartList[targetIndex];
      const upperCart = cartList[targetIndex - 1];

      await prisma.cartList.update({
        where: {
          id: targetCart.id,
        },
        data: {
          displayOrder: upperCart.displayOrder,
        },
      });

      await prisma.cartList.update({
        where: {
          id: upperCart.id,
        },
        data: {
          displayOrder: targetCart.displayOrder,
        },
      });
    } else {
      if (targetIndex === cartList.length - 1) {
        return {
          isSuccess: false,
          error: "一番下のカートリストは下に移動できません🥲",
        };
      }
      const targetCart = cartList[targetIndex];
      const lowerCart = cartList[targetIndex + 1];

      await prisma.cartList.update({
        where: {
          id: targetCart.id,
        },
        data: {
          displayOrder: lowerCart.displayOrder,
        },
      });

      await prisma.cartList.update({
        where: {
          id: lowerCart.id,
        },
        data: {
          displayOrder: targetCart.displayOrder,
        },
      });
    }

    revalidatePath("/shopping-list");

    return {
      isSuccess: true,
      message: "カートリストの順序を更新しました🎉",
    };
  } catch (error) {
    console.error("Error updating memo order:", error);
    return {
      isSuccess: false,
      error: "カートリストの順序の更新に失敗しました🥲",
    };
  }
};
