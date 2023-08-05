"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { removeCartList } from "@/src/actions/cartListActions";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const RemoveCartListButton = ({ recipeId, cartListItemId }: { recipeId: string; cartListItemId: number }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          removeCartList(recipeId, cartListItemId);
        });
        router.refresh();
      }}
    >
      {isPending ? <Spinner /> : "食材削除"}
    </Button>
  );
};

export default RemoveCartListButton;
