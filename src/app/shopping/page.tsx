"use client";

import { useState } from "react";
import TopBar from "@/src/components/layout/top-bar";
import { ShoppingListItem } from "@/src/components/shopping-list";
import { Checkbox } from "../../components/ui/checkbox";
import { cn } from "../../lib/utils";

const page = () => {

  return (
    <>
      <TopBar centerComponent={<div className="md:text-xl font-bold text-mauve12">買い物リスト</div>} />
      <ShoppingListItem />
    </>
  );
};

export default page;
