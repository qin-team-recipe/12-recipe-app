"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { bottomBarRoutes } from "../../constants/routes";
import NavbarItem from "./navbar-item";

const BottomNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(() => bottomBarRoutes(pathname), [pathname]);

  return (
    <div className="fixed bottom-0 z-10 flex w-full translate-y-px justify-around gap-x-2 bg-gray-50 p-2 shadow-extend-y-top md:hidden">
      {routes.map((route) => (
        <div key={route.label}>
          <NavbarItem {...route} />
        </div>
      ))}
    </div>
  );
};

export default BottomNavbar;
