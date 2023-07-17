import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getCartList = async () => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const cartList = await prisma.cartList.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      recipe: {
        select: {
          title: true,
        },
      },
      CartListItem: {
        include: {
          ingredient: {
            select: {
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  return cartList;
};
