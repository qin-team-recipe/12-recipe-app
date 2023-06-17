import { searchBasePath } from "@/src/constants/routes";

export const tabs = [
  {
    label: "レシピ",
    link: `${searchBasePath}/recipe`,
    value: "レシピ",
  },
  {
    label: "シェフ",
    link: `${searchBasePath}/chef`,
    value: "シェフ",
  },
];
