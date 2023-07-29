import { getRecipeById } from "@/src/actions/getRecipeById";
import LinkableTabs from "@/src/components/linkable-tabs";
import { Separator } from "@/src/components/ui/separator";

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
    <>
      <Separator className="hidden h-full w-[1px] md:block" />
      <main className="mb-20 w-full flex-1 overflow-y-auto">
        <RecipeHero id={params.id} />
        <LinkableTabs tabs={tabs(params.id)}>{children}</LinkableTabs>
      </main>
      <Separator className="hidden h-full w-[1px] md:block" />
    </>
  );
}
