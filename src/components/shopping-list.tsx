import { cn } from "../lib/utils";
import { Checkbox } from "./ui/checkbox";

type Props = {
  isChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

// 買い物リスト
export const ShoppingListItem = ({ isChecked, onChange }: Props) => {
  return (
    <div className="flex items-start gap-x-2 py-2 border-y px-2">
      <Checkbox className={cn(`rounded-full border-2 border-tomato9 h-5 w-5`)} isChecked={isChecked} onChange={onChange} />
      <div className={cn(`flex-1 leading-snug text-mauve12`, isChecked && "text-mauve8")}>ああ</div>
      {isChecked && <button className="text-tomato9">削除</button>}
    </div>
  );
};
