"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { sideBarRoutes } from "../../constants/routes";
import NavbarItem from "./navbar-item";

const SideNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(() => sideBarRoutes(pathname), [pathname]);

  return (
    <div className="sticky top-0 hidden h-full justify-center gap-y-2  overflow-auto bg-background p-2 md:flex md:w-[240px]">
      <div className="flex flex-col items-start gap-y-4 px-4 py-4">
        <span className="mb-4 text-2xl font-bold text-mauve12">LOGO</span>
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
