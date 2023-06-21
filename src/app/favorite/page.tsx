import TopBar from "@/src/components/layout/top-bar";

import SettingsActionIcon from "./_components/settings-action-icon";
import { FavoriteChefList } from "@/src/components/favorite-chef-list";

const page = () => {
  return (
    <>
      <TopBar
        centerComponent={<h1 className="md:text-xl text-primary font-bold">お気に入り</h1>}
        trailingComponent={<SettingsActionIcon />}
      />
      <FavoriteChefList />
    </>
  );
};

export default page;
