import { Heart, Search, ShoppingCart } from "lucide-react";

export const searchBasePath = "/search";

export const favoriteBasePath = "/favorite";

export const shoppingBasePath = "/shopping-lists";

export const sideBarRoutes = (pathname: string) => [
  { href: "/", label: "話題を検索", icon: Search, active: pathname === "/" || pathname.includes(searchBasePath) },
  { href: favoriteBasePath, label: "お気に入り", icon: Heart, active: pathname === favoriteBasePath },
  { href: shoppingBasePath, label: "買い物リスト", icon: ShoppingCart, active: pathname === shoppingBasePath },
];

export const bottomBarRoutes = (pathname: string) => [
  { href: "/", label: "検索", icon: Search, active: pathname === "/" || pathname.includes(searchBasePath) },
  { href: favoriteBasePath, label: "お気に入り", icon: Heart, active: pathname === favoriteBasePath },
  { href: shoppingBasePath, label: "お買い物", icon: ShoppingCart, active: pathname === shoppingBasePath },
];
