import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  activeLabel: string;
  inactiveLabel: string;
  formAction: ((formData: FormData) => void) | undefined;
}

const ToggleButton = ({ className, isActive, activeLabel, inactiveLabel, formAction }: Props) => {
  return (
    <>
      <Button
        variant={isActive ? "outline" : "destructive"}
        className={cn(
          "w-fit",
          "hover:shadow",
          isActive ? "border-tomato4 bg-mauve1 text-tomato9" : "bg-tomato9",
          className
        )}
        formAction={formAction}
      >
        {isActive ? activeLabel : inactiveLabel}
      </Button>
    </>
  );
};

export default ToggleButton;
