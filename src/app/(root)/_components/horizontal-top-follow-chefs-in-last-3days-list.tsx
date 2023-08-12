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
                imageUrl={
                  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
                }
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
