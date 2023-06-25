import { CONSTANTS } from "@/src/constants/constants";

export const chefTabs = (chefId: number) => {
  return [
    {
      label: CONSTANTS.RECIPE,
      link: `/chef/${chefId}`,
      value: CONSTANTS.RECIPE
    },
    {
      label: CONSTANTS.LINK,
      link: `/chef/${chefId}/link`,
      value: CONSTANTS.LINK
    }
  ]
}