"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { bottomBarRoutes } from "../constants/routes";
import NavbarItem from "./navbar-item";

const BottomNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(() => bottomBarRoutes(pathname), [pathname]);

  return (
    <div className="md:hidden flex gap-x-2 bg-gray-50 pb-2 w-full p-2 fixed bottom-0 justify-around shadow-extend-y-top z-10 translate-y-px">
      {routes.map((route) => (
        <div key={route.label}>
          <NavbarItem {...route} />
        </div>
      ))}
    </div>
  );
};

export default BottomNavbar;
