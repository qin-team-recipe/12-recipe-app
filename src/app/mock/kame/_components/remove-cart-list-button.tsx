"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { removeCartListItem } from "@/src/actions/cartListItemActions";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const RemoveCartListButton = ({ recipeId, cartListItemId }: { recipeId: string; cartListItemId: number }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          removeCartListItem(recipeId, cartListItemId);
        });
        router.refresh();
      }}
    >
      {isPending ? <Spinner /> : "食材削除"}
    </Button>
  );
};

export default RemoveCartListButton;
