"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteCartList } from "@/src/actions/deleteCartList";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const DeleteCartListButton = ({ cartListId }: { cartListId: number }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          deleteCartList(cartListId);
        });
        router.refresh();
      }}
    >
      {isPending ? <Spinner /> : "カート削除"}
    </Button>
  );
};

export default DeleteCartListButton;
