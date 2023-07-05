"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { cn } from "../lib/utils";
import { Input } from "./ui/input";

export const LinkListItem = () => {
  const [, setUrl] = useState("");
  const [inputCount, setInputCount] = useState(1);

  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);
  };

  const increaseInput = () => {
    setInputCount(inputCount + 1);
  };

  return (
    <div className="">
      <div className="text-md my-1 ml-4 font-bold">リンク（任意）</div>
      {[...Array(inputCount)].map((_, index) => (
        <Input
          key={index + 1}
          className={cn(`border-x-none rounded-none`, index >= 1 && "border-t-0")}
          onChange={handleUrl}
        />
      ))}
      <button className="ml-4 mt-2 flex items-center text-sm text-tomato9 md:text-base" onClick={increaseInput}>
        <Plus className="h-4 w-4" />
        <span className="ml-1">リンクを追加する</span>
      </button>
    </div>
  );
};
