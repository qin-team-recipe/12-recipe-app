import DetailAbstract from "@/src/components/detail-abstract";
import DetailHeaderImage from "@/src/components/detail-header-image";
import NumberUnit from "@/src/components/number-unit";
import ToggleButton from "@/src/components/toggle-button";
import { BUTTON_NAMES } from "@/src/constants/button-names";
import { CONSTANTS } from "@/src/constants/constants";

const page = () => {
  return (
    <>
      <DetailHeaderImage imageUrl={"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb"} />
      <div className="grid gap-4 p-4">
        <DetailAbstract name={"シェフ名"} abstract={"シェフ概要"} />
        <div className="flex items-center gap-x-4">
          <NumberUnit numbers={1234} unit={CONSTANTS.RECIPE} />
          <NumberUnit numbers={500} unit={CONSTANTS.FOLLOWER} />
        </div>
        <ToggleButton isActive={true} activeLabel={BUTTON_NAMES.UN_FOLLOW} inactiveLabel={BUTTON_NAMES.IS_FOLLOW} />
      </div>
    </>
  );
};

export default page;
