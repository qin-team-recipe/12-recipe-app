import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getMyCartList = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

  const myShoppingList = await prisma.cartList.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      CartListItem: {
        include: {
          ingredient: true,
        },
        orderBy: {
          order: "asc",
        },
      },
      recipe: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  return myShoppingList;
};
