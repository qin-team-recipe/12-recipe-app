import { LucideIcon } from "lucide-react";

export interface NavItem {
  title?: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  icon?: LucideIcon;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
