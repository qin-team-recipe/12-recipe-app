import { favChefList } from "../constants/dummy";
import { ChefIcon } from "./chef-icon";

export const FavoriteChefList = () => {
  return (
    <div>
      <div className="text-[20px] font-bold ml-3 my-[8px]">シェフ</div>
      <div className="flex ml-[12px] gap-[12px] overflow-scroll">
        {favChefList.map((favChef) => (
          <ChefIcon
            routingUrl={favChef.routingUrl}
            imageUrl={favChef.imageUrl}
            chefName={favChef.chefName}
          />
        ))}
      </div>
    </div>
  );
};
