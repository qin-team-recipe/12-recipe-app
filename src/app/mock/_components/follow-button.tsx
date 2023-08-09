import { followChef, unFollowChef } from "@/src/actions/actionsForFollow";
import ToggleButton from "@/src/components/toggle-button";
import { BUTTON_NAMES } from "@/src/constants/button-names";

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
