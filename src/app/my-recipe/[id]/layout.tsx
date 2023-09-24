import LinkableTabs from "@/src/components/linkable-tabs";

import MyRecipeHero from "./_components/my-recipe-hero";
import { tabs } from "./_constants/tabs";

export default function layout({ params, children }: { params: { id: string }; children: React.ReactNode }) {
  return (
    <div className="mb-20">
      <MyRecipeHero id={params.id} />
      <LinkableTabs tabs={tabs(params.id)}>{children}</LinkableTabs>
    </div>
  );
}
