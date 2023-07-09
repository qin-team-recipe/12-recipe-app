"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { cn } from "../lib/utils";
import { Input } from "./ui/input";

export const LinkListItem = () => {
  const [inputCount, setInputCount] = useState(1);

  const increaseInput = () => {
    setInputCount(inputCount + 1);
  };

  return (
    <div>
      <div className="my-1 ml-4 font-bold">リンク（任意）</div>
      {[...Array(inputCount)].map((_, index) => (
        <Input key={index} className={cn(`rounded-none border-x-0`, index > 0 && "border-t-0")} />
      ))}
      <button className="ml-4 mt-2 flex items-center text-sm text-tomato9 md:text-base" onClick={increaseInput}>
        <Plus className="h-4 w-4" />
        <span className="ml-1">リンクを追加する</span>
      </button>
    </div>
  );
};
