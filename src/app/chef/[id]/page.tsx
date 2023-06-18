import React from "react";

import DetailAbstract from "@/src/components/detail-abstract";
import DetailHeaderImage from "@/src/components/detail-header-image";
import FavoriteButton from "@/src/components/favorite-button";
import NumberUnit from "@/src/components/number-unit";
import { BUTTON_NAMES } from "@/src/constants/button-names";
import { CONSTANTS } from "@/src/constants/constants";

const page = () => {
  return (
    <div className="">
      <DetailHeaderImage imageUrl={"https://images.unsplash.com/photo-1492633423870-43d1cd2775eb"} />
      <div className="grid p-4 gap-4">
        <DetailAbstract name={"シェフ名"} abstract={"シェフ概要"} />
        <div className="flex gap-x-4 items-center">
          <NumberUnit numbers={1234} unit={CONSTANTS.RECIPE} />
          <NumberUnit numbers={500} unit={CONSTANTS.FOLLOWER} />
        </div>
        <FavoriteButton
          isFavorite={true}
          isFavoriteName={BUTTON_NAMES.IS_FOLLOW}
          unFavoriteName={BUTTON_NAMES.UN_FOLLOW}
        />
      </div>
    </div>
  );
};

export default page;
