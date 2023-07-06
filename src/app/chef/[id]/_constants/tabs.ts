import { CONSTANTS } from "@/src/constants/constants";
import { LinkableTab } from "@/src/types/LinkableTab";

export const chefTabs = (chefId: number): LinkableTab[] => {
  return [
    {
      link: `/chef/${chefId}`,
      value: CONSTANTS.RECIPE,
    },
    {
      link: `/chef/${chefId}/link`,
      value: CONSTANTS.LINK,
    },
  ];
};
