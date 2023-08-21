import { getRecipeById } from "@/src/actions/getRecipeById";

import LinkableTabs from "@/src/components/linkable-tabs";
import { Separator } from "@/src/components/ui/separator";

import RecipeHero from "./_components/recipe-hero";
import { tabs } from "./_constants/tabs";

export default function layout({ params, children }: { params: { id: string }; children: React.ReactNode }) {
  return (
    <>
      <RecipeHero id={params.id} />
      <LinkableTabs tabs={tabs(params.id)}>{children}</LinkableTabs>
    </>
  );
}
