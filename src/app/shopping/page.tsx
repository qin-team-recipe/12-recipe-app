import { useState } from "react";

import TopBar from "@/src/components/layout/top-bar";
import { EditableChecklistItem } from "@/src/components/shopping-list";

import { Checkbox } from "../../components/ui/checkbox";
import { cn } from "../../lib/utils";

const page = () => {
  return (
    <>
      <TopBar centerComponent={<div className="font-bold text-mauve12 md:text-xl">買い物リスト</div>} />
      <EditableChecklistItem text="ああ" />
    </>
  );
};

export default page;
