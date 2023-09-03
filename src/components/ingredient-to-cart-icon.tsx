"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

import { addCartListItem, removeCartListItem } from "@/src/actions/actionsForCartListItem";
import { cn } from "@/src/lib/utils";
import { ShoppingCart } from "lucide-react";

import { useToast } from "@/src/components/ui/use-toast";

type Props = {
  id: number;
  recipeId: string;
  isActive: boolean;
};

const IngredientToCartIcon = ({ id, recipeId, isActive }: Props) => {
  const [isActiveState, setIsActiveState] = useOptimistic(isActive);

  const { toast } = useToast();

  const handleToggleCartListItem = async ({ recipeId, ingredientId }: { recipeId: string; ingredientId: number }) => {
    setIsActiveState((prev) => !prev);

    const currentActiveState = isActiveState;

    const action = currentActiveState ? removeCartListItem : addCartListItem;

    const result = await action({ recipeId, ingredientId });

    if (!result.isSuccess) {
      setIsActiveState((prev) => !prev);
      toast({
        variant: "destructive",
        title: result.error,
      });
    } else {
    }
  };

  return (
    <button
      className={cn("pl-[20px] text-mauve10 hover:text-mauve11", isActiveState && "text-mauve12 hover:text-mauve12")}
      onClick={() => handleToggleCartListItem({ recipeId, ingredientId: id })}
    >
      <ShoppingCart size={20} />
    </button>
  );
};

export default IngredientToCartIcon;
