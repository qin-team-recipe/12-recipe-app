import { getChefsInMyFollowingList } from "@/src/actions/getChefsInMyFollowingList";

import NoDataDisplay from "@/src/components/no-data-display";

import ChefAvatar from "./chef-avatar";

const HorizontalFollowingChefsList = async () => {
  const followingChefs = await getChefsInMyFollowingList();

  return (
    <>
      {followingChefs.length > 0 ? (
        <ul className="mt-3 flex gap-4 overflow-scroll pl-4">
          {followingChefs.map((chef) => (
            <li key={chef.id} className="flex w-[64px] flex-col items-center">
              <ChefAvatar id={chef.id} profileImage={chef.profileImage} name={chef.name} />
              <span className="mt-1 line-clamp-1 w-[64px] overflow-hidden whitespace-nowrap text-center text-sm text-primary">
                {chef.name}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <NoDataDisplay text="まだフォローしているシェフはいません。" />
      )}
    </>
  );
};

export default HorizontalFollowingChefsList;
