"use client";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  activeLabel: string;
  inactiveLabel: string;
  onClick?: () => void;
}

const ToggleButton = ({ className, isActive, activeLabel, inactiveLabel, onClick }: Props) => {
  return (
    <>
      <Button
        variant={isActive ? "outlineDestructive" : "destructive"}
        className={cn("w-fit", className)}
        onClick={onClick}
      >
        {isActive ? activeLabel : inactiveLabel}
      </Button>
    </>
  );
};

export default ToggleButton;
