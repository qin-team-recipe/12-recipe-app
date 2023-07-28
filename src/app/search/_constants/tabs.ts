import { searchBasePath } from "@/src/constants/routes";
import { LinkableTab } from "@/src/types/LinkableTab";

export const tabs: LinkableTab[] = [
  {
    link: `${searchBasePath}/recipes`,
    value: "レシピ",
  },
  {
    link: `${searchBasePath}/chefs`,
    value: "シェフ",
  },
];
