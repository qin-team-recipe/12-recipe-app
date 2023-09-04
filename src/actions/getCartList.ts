import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getCartList = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/favorite");

  const cartList = await prisma.cartList.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      recipe: {
        select: {
          title: true,
          Ingredient: true,
        },
      },
      CartListItem: {
        select: {
          id: true,
          isCompleted: true,
          ingredient: {
            select: {
              title: true,
              id: true,
            },
          },
        },
      },
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  const allCartListItems = cartList.flatMap((cart) => cart.CartListItem);

  // 全てのカートアイテムが買い物リストに追加されているかどうかのフラグ
  const isAllCartListItemCompleted =
    allCartListItems.length === 0
      ? false
      : cartList.every(({ recipe }) =>
          recipe.Ingredient.every((ingredient) =>
            allCartListItems.some((cartItem) => cartItem.ingredient?.id === ingredient.id)
          )
        );

  // 各材料がユーザーのカートアイテムに追加されているかどうかのフラグ
  const checkIngredientInCart = (ingredientId: number): boolean => {
    return cartList.some(({ CartListItem }) =>
      CartListItem.some((cartListItem) => cartListItem.ingredient?.id === ingredientId)
    );
  };

  return {
    cartList,
    isAllCartListItemCompleted,
    checkIngredientInCart,
  };
};
