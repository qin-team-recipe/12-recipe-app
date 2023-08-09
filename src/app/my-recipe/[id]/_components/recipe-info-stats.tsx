"use client";

import Link from "next/link";

import { favoriteRecipe, unFavoriteRecipe } from "@/src/actions/actionsForFavoriteRecipe";
import ToggleButton from "@/src/components/toggle-button";
import { useOptimisticToggle } from "@/src/hooks/useOptimisticToggle";
import { cn } from "@/src/lib/utils";

import NumberUnit from "../../../../components/number-unit";
import { buttonVariants } from "../../../../components/ui/button";
import { CONSTANTS } from "../../../../constants/constants";

type Props = {
  recipeId: string;
  isActive: boolean;
  isPublished: boolean;
  favoriteCount: number;
};

const RecipeInfoStats = ({ recipeId, isActive, isPublished, favoriteCount }: Props) => {
  const { optimisticState, updateCount } = useOptimisticToggle({
    count: favoriteCount,
    isActive,
    activeAction: favoriteRecipe,
    inactiveAction: unFavoriteRecipe,
  });

  return (
    <>
      <div className="flex items-center gap-4">
        <span
          className={buttonVariants({
            variant: "outline",
            className: cn(isPublished ? "border-tomato9 text-tomato9" : "border-mauve9 text-mauve9"),
          })}
        >
          {isPublished ? "公開中" : "非公開"}
        </span>
        <NumberUnit numbers={optimisticState.count} unit={CONSTANTS.FAVORITE} />
      </div>
      <div className="flex gap-4">
        <ToggleButton
          className="flex-1"
          isActive={optimisticState.isActive}
          activeLabel={"お気に入りに追加済"}
          inactiveLabel={"お気に入りに追加"}
          onClick={() => updateCount(recipeId)}
        />
        <Link
          href={`/my-recipe/${recipeId}/edit`}
          className={buttonVariants({
            variant: "outline",
            className: "flex-1 border-mauve9 text-mauve12",
          })}
        >
          レシピを編集
        </Link>
      </div>
    </>
  );
};
export default RecipeInfoStats;
