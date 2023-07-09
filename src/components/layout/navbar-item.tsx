import Link from "next/link";

import { LucideIcon } from "lucide-react";

import { cn } from "../../lib/utils";

type Props = {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href: string;
};

const NavbarItem: React.FC<Props> = ({ icon: Icon, label, active, href }) => {
  return (
    <Link
      href={href}
      className={cn(
        `
        flex
        h-auto
        w-24
        cursor-pointer
        flex-col
        items-center
        gap-x-4
        px-2
        py-1
        font-medium
        text-mauve11
        transition
        hover:rounded-2xl
        hover:bg-neutral-100
        md:w-auto
        md:flex-row`,
        active && "text-tomato9"
      )}
    >
      <Icon size={24} />
      <span className={cn(`truncate text-sm md:text-lg`, active && "font-bold")}>{label}</span>
    </Link>
  );
};

export default NavbarItem;
