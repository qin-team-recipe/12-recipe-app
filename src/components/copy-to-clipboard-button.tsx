"use client";

import { useToast } from "@/src/components/ui/use-toast";
import { Copy } from "lucide-react";

import { kToastDuration } from "../constants/constants";

type Props = {
  recipeName: string;
  servingCount: number;
  ingredients: { title: string }[];
};

const CopyToClipboardButton = ({ recipeName, servingCount, ingredients }: Props) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    const ingredientList = ingredients.map(({ title }) => `- ${title}`).join("\n");
    const copyText = `${recipeName}[${servingCount}人前]\n${ingredientList}`;

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        toast({
          variant: "default",
          title: "コピーしました",
          duration: kToastDuration,
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "コピーに失敗しました",
          duration: kToastDuration,
        });
      });
  };

  return (
    <button onClick={copyToClipboard} className="flex items-center gap-2 self-end pr-4 pt-2 text-[#0066DB]">
      <Copy />
      <span>コピーする</span>
    </button>
  );
};

export default CopyToClipboardButton;
