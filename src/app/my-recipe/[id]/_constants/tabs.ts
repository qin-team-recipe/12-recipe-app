import { LinkableTab } from "@/src/types/LinkableTab";

export const tabs = (id: string): LinkableTab[] => [
  {
    value: "作り方",
    link: `/my-recipe/${id}`,
  },
  {
    value: "材料",
    link: `/my-recipe/${id}/ingredients`,
  },
];
