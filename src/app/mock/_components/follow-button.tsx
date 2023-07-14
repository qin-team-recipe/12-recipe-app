import { followChef, unFollowChef } from "@/src/actions/followActions";
import ToggleButton from "@/src/components/toggle-button";
import { BUTTON_NAMES } from "@/src/constants/button-names";

type Props = {
  isActive: boolean;
  followedId: string;
};

const FollowButton = ({ isActive, followedId: chefId }: Props) => {
  return (
    <>
      <form>
        <input type="hidden" name="followedId" value={chefId} />
        <ToggleButton
          className="w-full"
          isActive={isActive}
          activeLabel={BUTTON_NAMES.UN_FOLLOW}
          inactiveLabel={BUTTON_NAMES.IS_FOLLOW}
          formAction={isActive ? unFollowChef : followChef}
        />
      </form>
    </>
  );
};

export default FollowButton;
