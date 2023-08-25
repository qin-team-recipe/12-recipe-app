import { followChef, unFollowChef } from "@/src/actions/actionsForFollow";
import { BUTTON_NAMES } from "@/src/constants/button-names";

import ToggleButton from "@/src/components/toggle-button";

type Props = {
  isActive: boolean;
  followedId: string;
};

const FollowButton = ({ isActive, followedId: chefId }: Props) => {
  return (
    <>
      <ToggleButton
        className="w-full"
        isActive={isActive}
        activeLabel={BUTTON_NAMES.UN_FOLLOW}
        inactiveLabel={BUTTON_NAMES.IS_FOLLOW}
        onClick={() => {
          isActive ? unFollowChef(chefId) : followChef(chefId);
        }}
      />
    </>
  );
};

export default FollowButton;
