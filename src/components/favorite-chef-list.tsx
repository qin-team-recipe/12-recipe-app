import { favChefList } from "../constants/dummy/fav-chef-list";
import { ChefIcon } from "./chef-icon";

export const FavoriteChefList = () => {
  return (
    <div>
      <div className="my-3 ml-3 text-xl font-bold text-mauve12">シェフ</div>
      <div className="ml-3 flex gap-3 overflow-scroll">
        {favChefList.map((favChef) => (
          <ChefIcon routingUrl={favChef.routingUrl} imageUrl={favChef.imageUrl} chefName={favChef.chefName} />
        ))}
      </div>
    </div>
  );
};
