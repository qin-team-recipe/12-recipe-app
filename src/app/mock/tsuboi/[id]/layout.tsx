import LinkableTabs from "@/src/components/linkable-tabs";
import RecipeHero from "@/src/app/mock/tsuboi/[id]/_components/recipe-hero";

import { tabs } from "./_constants/tabs";

export const metadata = {
  title: "BE Demo",
  description: "バックエンドのデモです",
};

export default function layout({ params, children }: { params: { id: string }; children: React.ReactNode }) {
  return (
    <div className="mb-20">
      <RecipeHero id={params.id} path="/mock/tsuboi" />
      <LinkableTabs tabs={tabs(params.id)}>{children}</LinkableTabs>
    </div>
  );
}
