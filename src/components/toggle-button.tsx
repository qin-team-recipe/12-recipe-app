import { cn } from "../lib/utils";
import { Button } from "./ui/button";

type Props = {
  isActive: boolean;
  activeLabel: string;
  inactiveLabel: string;
  // handleClick: () => void; // フォローやお気に入りをする/外すのクリックイベントを渡す(一旦コメントアウト)
};

const ToggleButton = ({ isActive, activeLabel, inactiveLabel }: Props) => {
  return (
    <>
      <Button
        variant={isActive ? "outline" : "destructive"}
        className={cn("w-fit", "hover:shadow", isActive ? "text-tomato9 bg-mauve1 border-accent" : "bg-tomato9")}
      >
        {isActive ? activeLabel : inactiveLabel}
      </Button>
    </>
  );
};

export default ToggleButton;
