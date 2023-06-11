import Link from "next/link";

import { LucideIcon } from "lucide-react";

import { cn } from "../lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href: string;
}

const NavbarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, href }) => {
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
        w-full
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
      <p className="truncate w-100 text-lg md:text-2lg">{label}</p>
    </Link>
  );
};

export default NavbarItem;
