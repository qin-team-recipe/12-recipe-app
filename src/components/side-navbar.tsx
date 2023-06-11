"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { Heart, Search, ShoppingCart } from "lucide-react";

import NavbarItem from "./navbar-item";
import { Separator } from "./ui/separator";

const SideNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      { href: "/", label: "話題を検索", icon: Search, active: pathname === "/" },
      { href: "/favorite", label: "お気に入り", icon: Heart, active: pathname === "/favorite" },
      { href: "/shopping", label: "買い物リスト", icon: ShoppingCart, active: pathname === "/shopping" },
    ],
    [pathname]
  );

  return (
    <div className="hidden md:flex gap-y-2 bg-background h-full md:w-[240px]  p-2 overflow-auto sticky top-0 justify-center">
      <div className="flex flex-col gap-y-4 px-4 py-4 items-start">
        <span className="text-2xl font-bold mb-4">LOGO</span>
        {routes.map((route, index) => (
          <div key={route.label}>
            <NavbarItem {...route} />
            {index < routes.length - 1 && <Separator className="mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
