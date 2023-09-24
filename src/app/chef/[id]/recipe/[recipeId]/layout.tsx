import LinkableTabs from "@/src/components/linkable-tabs";
import RecipeHero from "@/src/components/recipe-hero";

import { tabs } from "./_constants/tabs";

export default async function layout({
  params,
  children,
}: {
  params: { recipeId: string; id: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <RecipeHero id={params.recipeId} previousPath={`/chef/${params.id}`} />
      <LinkableTabs tabs={tabs({ chefId: params.id, recipeId: params.recipeId })}>{children}</LinkableTabs>
    </>
  );
}
