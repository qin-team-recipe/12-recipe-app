"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { postAllToCart } from "@/src/actions/postAllToCart";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const AddCartListButton = ({
  recipeId,
  ingredientIds,
  text,
}: {
  recipeId: string;
  ingredientIds: number[];
  text: string; // 動確の際にボタンを切り替えられたら楽なので追加。テスト環境用のprops
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          postAllToCart(recipeId, ingredientIds);
        });
        router.refresh();
      }}
      className="bg-green-900"
    >
      {isPending ? <Spinner /> : text}
    </Button>
  );
};

export default AddCartListButton;
