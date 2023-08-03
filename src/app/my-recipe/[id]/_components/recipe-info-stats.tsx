"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

import { favoriteRecipe, unFavoriteRecipe } from "@/src/actions/favoriteRecipeActions";
import ToggleButton from "@/src/components/toggle-button";
import { useToast } from "@/src/components/ui/use-toast";
import { useOptimisticToggle } from "@/src/hooks/useOptimisticToggle";

import NumberUnit from "../../../../components/number-unit";
import { Button } from "../../../../components/ui/button";
import { CONSTANTS } from "../../../../constants/constants";

type Props = {
  recipeId: string;
  isActive: boolean;
  favoriteCount: number;
};

const RecipeInfoStats = ({ recipeId, isActive, favoriteCount }: Props) => {
  const { optimisticState, updateCount } = useOptimisticToggle({
    count: favoriteCount,
    isActive,
    activeAction: favoriteRecipe,
    inactiveAction: unFavoriteRecipe,
  });

  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant={"outline"} className=" border-tomato9 px-2 text-tomato9">
          {/* // TODO: 公開中かどうかのフラグを追加 */}
          公開中
        </Button>
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
        <Button variant={"outline"} className="flex-1 border-mauve9 text-mauve12">
          レシピを編集
        </Button>
      </div>
    </>
  );
};
export default RecipeInfoStats;
