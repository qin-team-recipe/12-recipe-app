import { ReactNode } from "react";

import DetailAbstract from "@/src/components/detail-abstract";
import DetailHeaderImage from "@/src/components/detail-header-image";
import LinkableTabs from "@/src/components/linkable-tabs";
import NumberUnit from "@/src/components/number-unit";
import ProfileLink from "@/src/components/profile-link";
import ToggleButton from "@/src/components/toggle-button";
import { BUTTON_NAMES } from "@/src/constants/button-names";
import { CONSTANTS } from "@/src/constants/constants";

import { recipeTabs } from "./_constants/tabs";

type Props = {
  children: ReactNode;
};

const RecipeLayout = ({ children }: Props) => {
  return (
    <>
      <DetailHeaderImage imageUrl={"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb"} path="/" />
      <div className="grid gap-4 p-4">
        <DetailAbstract name={"レシピ名"} abstract={"レシピ概要"} />
        <div className="flex gap-x-4">
          <ProfileLink id={"1"} imagePath={"https://github.com/shadcn.png"} name={"シェフ名"} />
          <NumberUnit numbers={100000000} unit={CONSTANTS.FAVORITE} />
        </div>
        <ToggleButton
          isActive={false}
          activeLabel={BUTTON_NAMES.IS_FAVORITE}
          inactiveLabel={BUTTON_NAMES.UN_FAVORITE}
          formAction={undefined}
        />
      </div>
      {/* TODO: APIとの繋ぎこみではrecipeIdを渡す */}
      <LinkableTabs tabs={recipeTabs(1)}>{children}</LinkableTabs>
    </>
  );
};

export default RecipeLayout;
