import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getCartList = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

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
