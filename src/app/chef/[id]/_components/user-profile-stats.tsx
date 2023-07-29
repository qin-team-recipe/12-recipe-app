"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

import { followChef, unFollowChef } from "@/src/actions/followActions";
import NumberUnit from "@/src/components/number-unit";
import ToggleButton from "@/src/components/toggle-button";
import { BUTTON_NAMES } from "@/src/constants/button-names";
import { CONSTANTS } from "@/src/constants/constants";

type Props = {
  recipeCount: number;
  followedId: string;
  isActive: boolean;
  followersCount: number;
  isMe: boolean;
};

const UserProfileStats = ({ isMe, followersCount, recipeCount, followedId, isActive }: Props) => {
  const [optimisticFollow, setOptimisticFollow] = useOptimistic({ followersCount, isActive });

  const updateFollowCount = async () => {
    setOptimisticFollow((prevCount) =>
      isActive
        ? {
            followersCount: prevCount.followersCount - 1,
            isActive: false,
          }
        : {
            followersCount: prevCount.followersCount + 1,
            isActive: true,
          }
    );

    const action = isActive ? unFollowChef : followChef;

    try {
      await action(followedId);
    } catch (error) {
      setOptimisticFollow((prevCount) =>
        isActive
          ? {
              followersCount: prevCount.followersCount + 1,
              isActive: true,
            }
          : {
              followersCount: prevCount.followersCount - 1,
              isActive: false,
            }
      );
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-4">
        {recipeCount > 0 && <NumberUnit numbers={recipeCount} unit={CONSTANTS.RECIPE} />}
        <NumberUnit numbers={optimisticFollow.followersCount} unit={CONSTANTS.FOLLOWER} />
      </div>
      {/* フォロー & アンフォローするためのボタン */}
      {!isMe && (
        <ToggleButton
          className="w-full"
          isActive={optimisticFollow.isActive}
          activeLabel={BUTTON_NAMES.UN_FOLLOW}
          inactiveLabel={BUTTON_NAMES.IS_FOLLOW}
          onClick={() => updateFollowCount()}
        />
      )}
    </>
  );
};

export default UserProfileStats;
