import { notFound } from "next/navigation";

import { getChefById } from "@/src/actions/getChefById";
import DetailAbstract from "@/src/components/detail-abstract";
import DetailHeaderImage from "@/src/components/detail-header-image";
import LinkableTabs from "@/src/components/linkable-tabs";
import NumberUnit from "@/src/components/number-unit";
import RecipeCard from "@/src/components/recipe-card";
import { CONSTANTS } from "@/src/constants/constants";

import FollowButton from "../../../_components/follow-button";
import { tabs } from "./_constants/tabs";

const page = async ({ params }: { params: { id: string } }) => {
  const chef = await getChefById(params.id);

  if (!chef) return notFound();

  const { id, name, followersCount, isFollowing, Recipe, isMe, _count } = chef;

  return (
    <div className="mb-20">
      <DetailHeaderImage
        imageUrl={
          "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=667&q=80"
        }
        path={"/mock/tsuboi/chefs"}
      />
      <div className="grid gap-4 p-4">
        <DetailAbstract
          name={name}
          // TODO: 実データを入れる
          abstract={"シェフ概要"}
        />
        <div className="flex items-center gap-x-4">
          {_count.Recipe > 0 && <NumberUnit numbers={_count.Recipe} unit={CONSTANTS.RECIPE} />}
          <NumberUnit numbers={followersCount} unit={CONSTANTS.FOLLOWER} />
        </div>
        {!isMe && <FollowButton followedId={id} isActive={isFollowing} />}
      </div>
      <LinkableTabs tabs={tabs(id)}>
        <div className="grid grid-cols-2 gap-4 p-4">
          {Recipe.map((recipe) => (
            <div key={recipe.id} className="flex flex-col gap-2">
              <RecipeCard
                favorites={recipe.likesCount}
                description={recipe.description}
                title={recipe.title}
                imageUrl="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
                id={recipe.id}
              />
            </div>
          ))}
        </div>
      </LinkableTabs>
    </div>
  );
};

export default page;
