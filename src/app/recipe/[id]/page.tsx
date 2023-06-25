import DetailAbstract from "@/src/components/detail-abstract";
import DetailHeaderImage from "@/src/components/detail-header-image";
import NumberUnit from "@/src/components/number-unit";
import ProfileLink from "@/src/components/profile-link";
import ToggleButton from "@/src/components/toggle-button";
import { BUTTON_NAMES } from "@/src/constants/button-names";
import { CONSTANTS } from "@/src/constants/constants";

const page = () => {
  return (
    <>
      <DetailHeaderImage imageUrl={"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb"} />
      <div className="grid gap-4 p-4">
        <DetailAbstract name={"レシピ名"} abstract={"レシピ概要"} />
        <div className="flex gap-x-4">
          <ProfileLink chefId={1} avatar={"https://github.com/shadcn.png"} name={"シェフ名"} />
          <NumberUnit numbers={100000000} unit={CONSTANTS.FAVORITE} />
        </div>
        <ToggleButton
          isActive={false}
          activeLabel={BUTTON_NAMES.IS_FAVORITE}
          inactiveLabel={BUTTON_NAMES.UN_FAVORITE}
        />
      </div>
    </>
  );
};

export default page;
