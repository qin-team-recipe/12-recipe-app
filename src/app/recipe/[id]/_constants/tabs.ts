import { LinkableTab } from "@/src/types/LinkableTab";

export const tabs = (id: string): LinkableTab[] => [
  {
    value: "作り方",
    link: `/recipe/${id}`,
  },
  {
    value: "材料",
    link: `/recipe/${id}/ingredients`,
  },
];
