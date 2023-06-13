import Link from "next/link";

import { LucideIcon } from "lucide-react";

import { cn } from "../lib/utils";

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
        flex-col 
        md:flex-row 
        h-auto 
        items-center 
        w-24
        md:w-auto
        gap-x-4 
        text-md 
        font-medium
        cursor-pointer
        hover:bg-neutral-100
        hover:rounded-2xl
        transition
        text-neutral-400
        px-2
        py-1`,
        active && "text-accent"
      )}
    >
      <Icon size={24} />
      <p className={cn(`truncate w-100 text-base md:text-lg`, active && "font-bold")}>{label}</p>
    </Link>
  );
};

export default NavbarItem;
