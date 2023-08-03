"use client";

import { followChef, unFollowChef } from "@/src/actions/followActions";
import NumberUnit from "@/src/components/number-unit";
import ToggleButton from "@/src/components/toggle-button";
import { BUTTON_NAMES } from "@/src/constants/button-names";
import { CONSTANTS } from "@/src/constants/constants";
import { useOptimisticToggle } from "@/src/hooks/useOptimisticToggle";

type Props = {
  recipeCount: number;
  followedId: string;
  isActive: boolean;
  followersCount: number;
  isMe: boolean;
};

const UserProfileStats = ({ isMe, followersCount, recipeCount, followedId, isActive }: Props) => {
  const { optimisticState, updateCount } = useOptimisticToggle({
    count: followersCount,
    isActive,
    activeAction: followChef,
    inactiveAction: unFollowChef,
  });

  return (
    <>
      <div className="flex items-center gap-x-4">
        {recipeCount > 0 && <NumberUnit numbers={recipeCount} unit={CONSTANTS.RECIPE} />}
        <NumberUnit numbers={optimisticState.count} unit={CONSTANTS.FOLLOWER} />
      </div>
      {/* フォロー & アンフォローするためのボタン */}
      {!isMe && (
        <ToggleButton
          className="w-full"
          isActive={optimisticState.isActive}
          activeLabel={BUTTON_NAMES.UN_FOLLOW}
          inactiveLabel={BUTTON_NAMES.IS_FOLLOW}
          onClick={() => updateCount(followedId)}
        />
      )}
    </>
  );
};

export default UserProfileStats;
