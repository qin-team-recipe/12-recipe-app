import Link from "next/link";

import { getChefsInMyFollowingList } from "@/src/actions/getChefsInMyFollowingList";
import NoDataDisplay from "@/src/components/no-data-display";
import { Avatar, AvatarImage } from "@/src/components/ui/avatar";

const HorizontalFollowingChefsList = async () => {
  const followingChefs = await getChefsInMyFollowingList();

  return (
    <>
      {followingChefs.length > 0 ? (
        <ul className="mt-3 flex gap-4 overflow-scroll pl-4">
          {followingChefs.map((chef) => (
            <li key={chef.id} className="flex w-[64px] flex-col items-center">
              <Link href={`/chef/${chef.id}`}>
                <Avatar className="h-[64px] w-[64px]">
                  <AvatarImage
                    src={
                      chef.profileImage ||
                      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
                    }
                    alt={chef.name}
                  />
                </Avatar>
              </Link>
              <span className="mt-1 line-clamp-1 w-[64px] overflow-hidden whitespace-nowrap text-center text-sm text-primary">
                {chef.name}
              </span>
            </li>

            // <ChefIcon
            //   key={chef.id}
            //   path={`/mock/tsuboi/chefs/${chef.id}`}
            //   // TODO: chef.imageUrlを取得する
            //   imageUrl={
            //   }
            //   chefName={chef.name}
            // />
          ))}
        </ul>
      ) : (
        <NoDataDisplay text="まだフォローしているシェフはいません。" />
      )}
    </>
  );
};

export default HorizontalFollowingChefsList;
