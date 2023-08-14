import { Heart, Search, ShoppingCart } from "lucide-react";

export const searchBasePath = "/search";

export const favoriteBasePath = "/favorite";

export const shoppingListBasePath = "/shopping-list";

export const sideBarRoutes = (pathname: string) => [
  { href: "/", label: "一流レシピ", icon: Search, active: pathname === "/" || pathname.includes(searchBasePath) },
  { href: favoriteBasePath, label: "お気に入り", icon: Heart, active: pathname === favoriteBasePath },
  { href: shoppingListBasePath, label: "買い物リスト", icon: ShoppingCart, active: pathname === shoppingListBasePath },
];

export const bottomBarRoutes = (pathname: string) => [
  { href: "/", label: "検索", icon: Search, active: pathname === "/" || pathname.includes(searchBasePath) },
  { href: favoriteBasePath, label: "お気に入り", icon: Heart, active: pathname === favoriteBasePath },
  { href: shoppingListBasePath, label: "お買い物", icon: ShoppingCart, active: pathname === shoppingListBasePath },
];
