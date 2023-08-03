import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
};

const SettingListTile = ({ title, icon: Icon, onClick }: Props) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex w-full cursor-pointer items-center justify-between px-5 py-2 text-mauve1`}
      >
        <div className="ml-1 pt-1 text-lg text-mauve12">{title}</div>
        <Icon className="text-mauve12" />
      </button>
    </div>
  );
};

export default SettingListTile;
