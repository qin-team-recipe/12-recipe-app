import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  path: string;
  text: string;
  icon: ReactNode;
};

const SettingList = ({ path, text, icon }: Props) => {
  return (
    <div>
      <Link href={path} className={`flex cursor-pointer pl-5 text-mauve1 justify-between pr-5 py-2`}>
        {text && <div className="ml-1 pt-1 text-lg text-mauve12">{text}</div>}
        {icon}
      </Link>
    </div>
);
};

export default SettingList;
