"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { Heart, Search, ShoppingCart } from "lucide-react";

import NavbarItem from "./navbar-item";

const BottomNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      { href: "/", label: "検索", icon: Search, active: pathname === "/" },
      { href: "/favorite", label: "お気に入り", icon: Heart, active: pathname === "/favorite" },
      { href: "/shopping", label: "お買い物", icon: ShoppingCart, active: pathname === "/shopping" },
    ],
    [pathname]
  );

  return (
    <div className="md:hidden flex gap-x-2 bg-gray-50 pb-2 w-full p-2 fixed bottom-0 justify-around  shadow-y-top z-10 translate-y-px">
      {routes.map((route) => (
        <div key={route.label}>
          <NavbarItem {...route} />
        </div>
      ))}
    </div>
  );
};

export default BottomNavbar;
