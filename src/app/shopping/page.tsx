import { useState } from "react";

import TopBar from "@/src/components/layout/top-bar";
import { LinkListItem } from "@/src/components/link-list";
import { EditableChecklistItem } from "@/src/components/shopping-list";

const page = () => {
  return (
    <>
      <TopBar centerComponent={<div className="font-bold text-mauve12 md:text-xl">買い物リスト</div>} />
      <EditableChecklistItem text="ああ" />
      <LinkListItem />
    </>
  );
};

export default page;
