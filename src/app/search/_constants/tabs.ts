import { searchBasePath } from "@/src/constants/routes";
import { LinkableTab } from "@/src/types/LinkableTab";

export const tabs: LinkableTab[] = [
  {
    link: `${searchBasePath}/recipe`,
    value: "レシピ",
  },
  {
    link: `${searchBasePath}/chef`,
    value: "シェフ",
  },
];
