"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { sideBarRoutes } from "../constants/routes";
import NavbarItem from "./navbar-item";

const SideNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(() => sideBarRoutes(pathname), [pathname]);

  return (
    <div className="hidden md:flex gap-y-2 bg-background h-full md:w-[240px]  p-2 overflow-auto sticky top-0 justify-center">
      <div className="flex flex-col gap-y-4 px-4 py-4 items-start">
        <span className="text-2xl font-bold mb-4">LOGO</span>
        {routes.map((route) => (
          <div key={route.label}>
            <NavbarItem {...route} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
