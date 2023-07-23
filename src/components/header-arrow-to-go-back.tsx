import Link from "next/link";

import { ArrowLeft } from "lucide-react";

type Props = {
  path: string;
  color?: string;
  text?: string;
  border?: boolean;
};

const HeaderArrowToGoBack = ({ path, color, text, border }: Props) => {
  const headerBorder = border ? 'border-b-2 border-mauve6 w-full pb-2' :''
  return (
    <div>
      <Link href={path} className={`absolute top-5 flex cursor-pointer pl-5 text-mauve1 ${headerBorder}`}>
        <ArrowLeft size={32} className={color} />
        {text && <div className="ml-1 pt-1 text-xl text-mauve12">{text}</div>}
      </Link>
    </div>
);
};

export default HeaderArrowToGoBack;
