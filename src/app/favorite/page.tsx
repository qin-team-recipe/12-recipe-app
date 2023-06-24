import { FavoriteChefList } from "@/src/components/favorite-chef-list";
import TopBar from "@/src/components/layout/top-bar";

import SettingsActionIcon from "./_components/settings-action-icon";

const page = () => {
  return (
    <>
      <TopBar
        centerComponent={<h1 className="md:text-xl text-mauve12 font-bold">お気に入り</h1>}
        trailingComponent={<SettingsActionIcon />}
      />
      <FavoriteChefList />
    </>
  );
};

export default page;
