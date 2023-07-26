import { getRecipeById } from "@/src/actions/getRecipeById";
import LinkableTabs from "@/src/components/linkable-tabs";

import RecipeHero from "./_components/recipe-hero";
import { tabs } from "./_constants/tabs";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id);

  return {
    title: recipe.title,
  };
}

export default function layout({ params, children }: { params: { id: string }; children: React.ReactNode }) {
  return (
    <div className="mb-20">
      <RecipeHero id={params.id} />
      <LinkableTabs tabs={tabs(params.id)}>{children}</LinkableTabs>
    </div>
  );
}
