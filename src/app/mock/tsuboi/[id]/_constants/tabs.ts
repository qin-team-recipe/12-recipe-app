import { LinkableTab } from "@/src/types/LinkableTab";

export const tabs = (id: string): LinkableTab[] => [
  {
    value: "作り方",
    link: `/mock/tsuboi/${id}`,
  },
  {
    value: "材料",
    link: `/mock/tsuboi/${id}/ingredients`,
  },
  {
    value: "リンク",
    link: `/mock/tsuboi/${id}/links`,
  },
];
