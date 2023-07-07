import { favChefList } from "../constants/dummy/fav-chef-list";
import { ChefIcon } from "./chef-icon";

export const FavoriteChefList = () => {
  return (
    <div className="ml-4 mt-5">
      <div className="text-xl font-bold text-mauve12">シェフ</div>
      <div className="mt-3 flex gap-4 overflow-scroll">
        {favChefList.map((favChef) => (
          <ChefIcon
            key={favChef.chefId}
            path={favChef.routingUrl}
            imageUrl={favChef.imageUrl}
            chefName={favChef.chefName}
          />
        ))}
      </div>
    </div>
  );
};
