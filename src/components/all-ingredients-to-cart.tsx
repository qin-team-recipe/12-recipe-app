"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

import { postAllToCart } from "@/src/actions/postAllToCart";
import { cn } from "@/src/lib/utils";
import { ShoppingCart } from "lucide-react";

import { useToast } from "@/src/components/ui/use-toast";

type Props = {
  recipeId: string;
  ingredientIds: number[];
  isActive: boolean;
};

const AllIngredientsToCart = ({ recipeId, ingredientIds, isActive }: Props) => {
  const [optimisticState, setOptimisticState] = useOptimistic({ isActive });
  const { toast } = useToast();

  const handleAddAllCartListItem = async ({
    recipeId,
    ingredientIds,
  }: {
    recipeId: string;
    ingredientIds: number[];
  }) => {
    const result = await postAllToCart(recipeId, ingredientIds);
    setOptimisticState({ isActive: true });

    if (!result.isSuccess) {
      toast({
        variant: "destructive",
        title: result.error,
      });
    }
  };
  return (
    <button
      disabled={optimisticState.isActive}
      className={cn(
        "flex items-center gap-2 font-bold text-mauve10 hover:text-mauve11",
        optimisticState.isActive && "text-mauve12 hover:text-mauve12"
      )}
      onClick={() => handleAddAllCartListItem({ recipeId, ingredientIds: ingredientIds })}
    >
      <ShoppingCart size={20} />
      <span>まとめてお買い物リストに追加</span>
    </button>
  );
};

export default AllIngredientsToCart;
