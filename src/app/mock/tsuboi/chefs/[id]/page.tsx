import { notFound } from "next/navigation";

import getChefById from "@/src/actions/getChefById";
import DetailAbstract from "@/src/components/detail-abstract";
import DetailHeaderImage from "@/src/components/detail-header-image";
import NumberUnit from "@/src/components/number-unit";
import { CONSTANTS } from "@/src/constants/constants";

import FollowButton from "../../../_components/follow-button";

const page = async ({ params }: { params: { id: string } }) => {
  const chef = await getChefById(params.id);

  if (!chef) return notFound();

  const { id, name, followersCount, isFollowing, Recipe, isMe } = chef;

  return (
    <div className="mb-20">
      <DetailHeaderImage
        imageUrl={
          "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=667&q=80"
        }
      />
      <div className="grid gap-4 p-4">
        <DetailAbstract
          name={name}
          // TODO: 実データを入れる
          abstract={"シェフ概要"}
        />
        <div className="flex items-center gap-x-4">
          {Recipe && <NumberUnit numbers={Recipe.length} unit={CONSTANTS.RECIPE} />}
          <NumberUnit numbers={followersCount} unit={CONSTANTS.FOLLOWER} />
        </div>
        {!isMe && <FollowButton followedId={id} isActive={isFollowing} />}
      </div>
    </div>
  );
};

export default page;
