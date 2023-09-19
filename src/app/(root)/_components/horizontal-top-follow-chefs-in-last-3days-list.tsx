import { getChefsWithTopFollowersInLast3Days } from "@/src/actions/getChefsTopFollowersInLast3Days";

import { ChefCard } from "@/src/components/chef-card";
import NoDataDisplay from "@/src/components/no-data-display";

const HorizontalTopFollowChefsInLast3DaysList = async () => {
  const topFollowersInLast3Days = await getChefsWithTopFollowersInLast3Days();

  return (
    <>
      {topFollowersInLast3Days.length > 0 ? (
        <ul className="flex w-screen gap-x-2  overflow-x-scroll px-4 md:w-full">
          {topFollowersInLast3Days.map(({ id, name, profileImage }) => (
            <li key={id} className="mt-2 w-[160px] flex-none">
              <ChefCard
                path={`/chef/${id}`}
                imageUrl={profileImage || "/images/chef-placeholder.png"}
                chefName={name}
              />
            </li>
          ))}
        </ul>
      ) : (
        <NoDataDisplay text="過去3日間でフォローされたシェフはいません。" />
      )}
    </>
  );
};

export default HorizontalTopFollowChefsInLast3DaysList;
