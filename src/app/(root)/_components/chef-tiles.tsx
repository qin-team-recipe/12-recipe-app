import { getChefs } from "@/src/actions/getChefs";
import ChefTileList from "@/src/components/chef-tile-list";

const ChefTiles = async () => {
  const { chefs } = await getChefs({
    skip: 0,
    limit: 10,
  });

  return (
    <>
      <ChefTileList chefs={chefs} />
    </>
  );
};

export default ChefTiles;
