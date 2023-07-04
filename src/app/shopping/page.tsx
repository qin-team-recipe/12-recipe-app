"use client";

import { useState } from "react";
import TopBar from "@/src/components/layout/top-bar";
import { ShoppingListItem } from "@/src/components/shopping-list";
import { Checkbox } from "../../components/ui/checkbox";
import { cn } from "../../lib/utils";

const page = () => {
  const [checked, setChecked] = useState(false);
  const handleCheckboxClick = () => {
    setChecked(!checked);
  }

  return (
    <>
      <TopBar centerComponent={<div className="md:text-xl font-bold text-mauve12">買い物リスト</div>} />
      <ShoppingListItem isChecked={checked} onChange={handleCheckboxClick} />

      {/* shopping-list.tsxの内容 */}
      <div className="flex items-start gap-x-2 py-2 border-y px-2">
        <Checkbox
          className={cn(`rounded-full border-2 border-tomato9 h-5 w-5`)}
          isChecked={checked}
          onChange={handleCheckboxClick}
        />
        <div className={cn(`flex-1 leading-snug text-mauve12`, checked && "text-mauve8")}>ああ</div>
        {checked && <button className="text-tomato9">削除</button>}
      </div>
    </>
  );
};

export default page;
