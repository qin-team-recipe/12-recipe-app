import { CONSTANTS } from "@/src/constants/constants";
import { LinkableTab } from "@/src/types/LinkableTab";

export const recipeTabs = (recipeId: number): LinkableTab[] => {
  return [
    {
      link: `/recipe/${recipeId}`,
      value: CONSTANTS.HOW_TO_COOK,
    },
    {
      link: `/recipe/${recipeId}/ingredients`,
      value: CONSTANTS.INGREDIENTS,
    },
  ];
};
