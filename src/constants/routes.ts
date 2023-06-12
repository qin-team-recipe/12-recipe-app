import { Heart, Search, ShoppingCart } from "lucide-react";

export const sideBarRoutes = (pathname: string) => [
  { href: "/", label: "話題を検索", icon: Search, active: pathname === "/" },
  { href: "/favorite", label: "お気に入り", icon: Heart, active: pathname === "/favorite" },
  { href: "/shopping", label: "買い物リスト", icon: ShoppingCart, active: pathname === "/shopping" },
];

export const bottomBarRoutes = (pathname: string) => [
  { href: "/", label: "検索", icon: Search, active: pathname === "/" },
  { href: "/favorite", label: "お気に入り", icon: Heart, active: pathname === "/favorite" },
  { href: "/shopping", label: "お買い物", icon: ShoppingCart, active: pathname === "/shopping" },
];
