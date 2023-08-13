"use client";

import { CommandItem } from "@/src/components/ui/command";
import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  text: string;
};

const CommandIconText = ({ Icon, text }: Props) => {
  return (
    <CommandItem className="flex gap-2">
      <Icon size={16} />
      <label className="text-sm" htmlFor="delete_all">
        {text}
      </label>
    </CommandItem>
  );
};

export default CommandIconText;
