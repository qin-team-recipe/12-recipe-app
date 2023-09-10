import { Heart, Search, ShoppingCart } from "lucide-react";

import { MainNavItem } from "../types/NavItem";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  title: "一流レシピ",
  description: "レシピアプリ",
  sideNav: {
    items: [
      {
        title: "一流レシピ",
        href: "/",
        description: "一流のシェフ・レシピを掲載",
        icon: Search,
        items: [],
      },
      {
        title: "お気に入り",
        href: "/favorite",
        description: "お気に入りのレシピ・シェフの表示",
        icon: Heart,
        items: [],
      },
      {
        title: "買い物リスト",
        href: "/shopping-list",
        description: "買い物リストの表示",
        icon: ShoppingCart,
        items: [],
      },
    ],
  } satisfies MainNavItem,
  bottomNav: {
    items: [
      {
        title: "検索",
        href: "/",
        description: "一流のシェフ・レシピを掲載",
        icon: Search,
        items: [],
      },
      {
        title: "お気に入り",
        href: "/favorite",
        description: "お気に入りのレシピ・シェフの表示",
        icon: Heart,
        items: [],
      },
      {
        title: "買い物リスト",
        href: "/shopping-list",
        description: "買い物リストの表示",
        icon: ShoppingCart,
        items: [],
      },
    ],
  } satisfies MainNavItem,
};
