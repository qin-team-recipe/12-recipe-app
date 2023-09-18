import { getMemos } from "@/src/actions/getMemos";
import { getMyCartList } from "@/src/actions/getMyCartList";

import { CartListItemForm, CartListItemFormValues } from "../_components/cart-list-item-form";
import { MemoForm, MemoFormValues } from "../_components/memo-form";

const page = async () => {
  const memos = await getMemos();

  const myCartList = await getMyCartList();

  const defaultValues: Partial<MemoFormValues> = {
    memo: memos.map((memo) => {
      return {
        id: memo.id,
        text: memo.title,
        order: memo.order,
        isCompleted: memo.isCompleted,
      };
    }),
  };

  return (
    <>
      {/* 自分メモ */}
      <section className="mt-5">
        <MemoForm defaultValues={defaultValues} />
      </section>
      {/* 買い物リスト */}
      <section className="pt-5">
        {myCartList.map(({ CartListItem, displayOrder, id, recipe }, index) => {
          const defaultValues: Partial<CartListItemFormValues> = {
            cartListItem: CartListItem.map((cart) => {
              return {
                id: cart.id,
                ingredient: cart.ingredient?.title ?? cart.title ?? "",
                order: cart.order,
                isCompleted: cart.isCompleted,
                isCustom: cart.isCustom,
              };
            }),
          };

          return (
            <CartListItemForm
              key={id}
              defaultValues={defaultValues}
              index={index}
              recipe={recipe}
              cartListId={id}
              cartListLength={myCartList.length}
              displayOrder={displayOrder}
            />
          );
        })}
      </section>
    </>
  );
};

export default page;
