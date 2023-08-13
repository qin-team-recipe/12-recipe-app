import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getCartList = async () => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) notFound();

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
        select: {
          id: true,
          isCompleted: true,
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
