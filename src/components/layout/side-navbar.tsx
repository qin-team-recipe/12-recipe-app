"use client";

import { useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { sideBarRoutes } from "../../constants/routes";
import NavbarItem from "./navbar-item";

const SideNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(() => sideBarRoutes(pathname), [pathname]);

  return (
    <div className="sticky top-0 hidden h-full justify-center gap-y-2  overflow-auto bg-background p-2 md:flex md:w-[240px]">
      <ul className="flex w-full flex-col items-start gap-y-6 p-4">
        <Image src="/images/logo.png" alt="一流レシピ" width={200} height={40} sizes="100vw" className="mb-4" />
        {routes.map((route) => (
          <li key={route.label}>
            <NavbarItem {...route} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavbar;
