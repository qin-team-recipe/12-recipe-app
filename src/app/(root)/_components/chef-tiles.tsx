import { getChefs } from "@/src/actions/getChefs";

import ChefTileList from "@/src/components/chef-tile-list";

const ChefTiles = async () => {
  const { chefs } = await getChefs();

  return (
    <>
      <ChefTileList chefs={chefs} />
    </>
  );
};

export default ChefTiles;
