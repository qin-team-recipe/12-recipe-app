import { getChefsWithTopFollowersInLast3Days } from "@/src/actions/getChefsTopFollowersInLast3Days";
import { getBlurDataURL } from "@/src/lib/images";

import BlurImage from "@/src/components/blur-image";
import { ChefCard } from "@/src/components/chef-card";
import NoDataDisplay from "@/src/components/no-data-display";

const HorizontalTopFollowChefsInLast3DaysList = async () => {
  const topFollowersInLast3Days = await getChefsWithTopFollowersInLast3Days();

  return (
    <>
      {topFollowersInLast3Days.length > 0 ? (
        <ul className="flex w-screen gap-x-2  overflow-x-scroll px-4 md:w-full">
          {topFollowersInLast3Days.map(async ({ id, name, profileImage }) => (
            <li key={id} className="mt-2 w-[160px] flex-none">
              <ChefCard id={id}>
                <BlurImage
                  src={profileImage || "/images/chef-placeholder.png"}
                  className="aspect-square h-auto w-full rounded-2xl object-cover"
                  alt={name}
                  width={160}
                  height={160}
                  placeholder="blur"
                  priority
                  blurDataURL={await getBlurDataURL(profileImage || "/images/chef-placeholder.png")}
                />
                <p className="absolute bottom-3 left-3 mr-3 line-clamp-2 rounded-md bg-[#040013]/[.48] px-1 text-xl font-semibold text-mauve1">
                  {name}
                </p>
              </ChefCard>
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
