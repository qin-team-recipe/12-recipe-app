import { getFollowingChefs } from "@/src/actions/getFollowingChefs";
import { ChefIcon } from "@/src/components/chef-icon";

const HorizontalFollowingChefsList = async () => {
  const chefs = await getFollowingChefs();

  return (
    <div className="mt-3 flex gap-4 overflow-scroll">
      {chefs.map((chef) => (
        <ChefIcon
          key={chef.id}
          path={`/mock/tsuboi/chefs/${chef.id}`}
          // TODO: chef.imageUrlを取得する
          imageUrl={
            "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
          }
          chefName={chef.name}
        />
      ))}
    </div>
  );
};

export default HorizontalFollowingChefsList;
