import { LinkableTab } from "@/src/types/LinkableTab";

export const tabs = (id: string): LinkableTab[] => [
  {
    value: "新着レシピ",
    link: `/chefs/${id}`,
  },
  {
    value: "人気レシピ",
    link: `/chefs/${id}/popular`,
  },
];
