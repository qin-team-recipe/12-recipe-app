import { LinkableTab } from "@/src/types/LinkableTab";

export const tabs = ({ chefId, recipeId }: { chefId: string; recipeId: string }): LinkableTab[] => [
  {
    value: "作り方",
    link: `/chef/${chefId}/recipe/${recipeId}`,
  },
  {
    value: "材料",
    link: `/chef/${chefId}/recipe/${recipeId}/ingredients`,
  },
];
