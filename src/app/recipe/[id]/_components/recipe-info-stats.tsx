"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

import { favoriteRecipe, unFavoriteRecipe } from "@/src/actions/favoriteRecipeActions";
import ProfileLink from "@/src/components/profile-link";
import ToggleButton from "@/src/components/toggle-button";
import { useToast } from "@/src/components/ui/use-toast";
import { useOptimisticToggle } from "@/src/hooks/useOptimisticToggle";

import NumberUnit from "../../../../components/number-unit";
import { CONSTANTS } from "../../../../constants/constants";

type Props = {
  recipeId: string;
  isActive: boolean;
  favoriteCount: number;
  userId: string;
  userName: string;
};

const RecipeInfoStats = ({ recipeId, isActive, favoriteCount, userId, userName }: Props) => {
  const { optimisticState, updateCount } = useOptimisticToggle({
    count: favoriteCount,
    isActive,
    activeAction: favoriteRecipe,
    inactiveAction: unFavoriteRecipe,
  });

  return (
    <>
      <div className="flex items-center gap-4">
        <ProfileLink id={userId} imagePath={"https://github.com/shadcn.png"} name={userName} />
        <NumberUnit numbers={optimisticState.count} unit={CONSTANTS.FAVORITE} />
      </div>
      <ToggleButton
        className="w-full"
        isActive={optimisticState.isActive}
        activeLabel={"お気に入りに追加済"}
        inactiveLabel={"お気に入りに追加"}
        onClick={() => updateCount(recipeId)}
      />
    </>
  );
};

export default RecipeInfoStats;
