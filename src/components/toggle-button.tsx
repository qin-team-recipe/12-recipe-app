import { cn } from "../lib/utils";
import { Button } from "./ui/button";

type Props = {
  isActive: boolean;
  activeLabel: string;
  inactiveLabel: string;
  formAction: ((formData: FormData) => void) | undefined;
};

const ToggleButton = ({ isActive, activeLabel, inactiveLabel, formAction }: Props) => {
  return (
    <>
      <Button
        variant={isActive ? "outline" : "destructive"}
        className={cn("w-fit", "hover:shadow", isActive ? "border-accent bg-mauve1 text-tomato9" : "bg-tomato9")}
        formAction={formAction}
      >
        {isActive ? activeLabel : inactiveLabel}
      </Button>
    </>
  );
};

export default ToggleButton;
