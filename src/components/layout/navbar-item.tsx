import Link from "next/link";

import { LucideIcon } from "lucide-react";

import { cn } from "../../lib/utils";

type Props = {
  icon: LucideIcon;
  label: string;
  segment: string;
  href: string;
};

const NavbarItem: React.FC<Props> = ({ icon: Icon, label, segment, href }) => {
  const isActive = (segment && href.includes(segment)) || (href === "/" && !segment);

  const baseClasses = `
    flex
    h-auto
    w-24
    cursor-pointer
    flex-col
    items-center
    gap-x-4
    px-2
    py-1
    font-serif
    text-mauve11
    transition
    hover:rounded-2xl
    hover:bg-neutral-100
    md:w-auto
    md:flex-row
  `;

  return (
    <Link href={href} className={cn(baseClasses, isActive && "text-tomato9")}>
      <Icon size={24} />
      <span className={cn("truncate text-base md:text-2xl", isActive && "font-bold")}>{label}</span>
    </Link>
  );
};

export default NavbarItem;
