"use client";

import { favoriteRecipe, unFavoriteRecipe } from "@/src/actions/actionsForFavoriteRecipe";
import { useOptimisticToggle } from "@/src/hooks/useOptimisticToggle";

import ProfileLink from "@/src/components/profile-link";
import ToggleButton from "@/src/components/toggle-button";

import NumberUnit from "../../../../components/number-unit";
import { CONSTANTS } from "../../../../constants/constants";

type Props = {
  recipeId: string;
  isActive: boolean;
  favoriteCount: number;
  userId: string;
  userName: string;
  profileImage: string | null;
};

const RecipeInfoStats = ({ recipeId, isActive, favoriteCount, userId, userName, profileImage }: Props) => {
  const { optimisticState, updateCount } = useOptimisticToggle({
    count: favoriteCount,
    isActive,
    activeAction: favoriteRecipe,
    inactiveAction: unFavoriteRecipe,
  });

  return (
    <>
      <div className="flex items-center gap-4">
        <ProfileLink id={userId} imagePath={profileImage} name={userName} />
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
