"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

import { favoriteRecipe, unFavoriteRecipe } from "@/src/actions/favoriteRecipeActions";
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
};

const RecipeInfoStats = ({ recipeId, isActive, favoriteCount, userId, userName }: Props) => {
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic({ favoriteCount, isActive });

  const updateFavoriteCount = async () => {
    setOptimisticFavorite((prev) =>
      isActive
        ? {
            favoriteCount: prev.favoriteCount - 1,
            isActive: false,
          }
        : {
            favoriteCount: prev.favoriteCount + 1,
            isActive: true,
          }
    );

    const action = isActive ? unFavoriteRecipe : favoriteRecipe;

    try {
      await action(recipeId);
    } catch (error) {
      setOptimisticFavorite((prev) =>
        isActive
          ? {
              favoriteCount: prev.favoriteCount + 1,
              isActive: true,
            }
          : {
              favoriteCount: prev.favoriteCount - 1,
              isActive: false,
            }
      );
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <ProfileLink id={userId} imagePath={"https://github.com/shadcn.png"} name={userName} />
        <NumberUnit numbers={favoriteCount} unit={CONSTANTS.FAVORITE} />
      </div>
      <ToggleButton
        className="w-full"
        isActive={optimisticFavorite.isActive}
        activeLabel={"お気に入りに追加済"}
        inactiveLabel={"お気に入りに追加"}
        onClick={() => updateFavoriteCount()}
      />
    </>
  );
};

export default RecipeInfoStats;
