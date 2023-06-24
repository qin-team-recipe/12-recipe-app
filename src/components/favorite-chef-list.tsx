import { favChefList } from "../constants/dummy/fav-chef-list";
import { ChefIcon } from "./chef-icon";

export const FavoriteChefList = () => {
  return (
    <div>
      <div className="text-xl font-bold ml-3 my-3 text-mauve12">シェフ</div>
      <div className="flex ml-3 gap-3 overflow-scroll">
        {favChefList.map((favChef) => (
          <ChefIcon routingUrl={favChef.routingUrl} imageUrl={favChef.imageUrl} chefName={favChef.chefName} />
        ))}
      </div>
    </div>
  );
};
