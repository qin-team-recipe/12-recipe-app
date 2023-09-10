"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import { siteConfig } from "@/src/config/site";

import NavbarItem from "./navbar-item";

const BottomNavbar = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="fixed bottom-0 z-10 flex w-full translate-y-px justify-around gap-x-2 bg-gray-50 p-2 shadow-extend-y-top md:hidden">
      {siteConfig.bottomNav.items.map((item) => (
        <div key={item.title}>
          <NavbarItem label={item.title} segment={String(segment || "")} icon={item.icon} href={item.href} />
        </div>
      ))}
    </div>
  );
};

export default BottomNavbar;
