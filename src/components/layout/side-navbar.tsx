"use client";

import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";

import { siteConfig } from "@/src/config/site";

import NavbarItem from "./navbar-item";

const SideNavbar = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="sticky top-0 hidden h-full justify-center gap-y-2  overflow-auto bg-background p-2 md:flex md:w-[240px]">
      <ul className="flex w-full flex-col items-start gap-y-6 p-4">
        <Image src="/images/logo.png" alt="一流レシピ" width={200} height={40} sizes="100vw" className="mb-4" />
        {siteConfig.sideNav.items.map((item) => {
          return (
            <li key={item.title}>
              <NavbarItem label={item.title} segment={String(segment || "")} icon={item.icon} href={item.href} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNavbar;
