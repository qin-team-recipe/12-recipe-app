import { LinkableTab } from "@/src/types/LinkableTab";

export const tabs = (id: string): LinkableTab[] => [
  {
    value: "レシピ",
    link: `/mock/tsuboi/chefs/${id}`,
  },
  {
    value: "リンク",
    link: `/mock/tsuboi/chefs/${id}/links`,
  },
];
