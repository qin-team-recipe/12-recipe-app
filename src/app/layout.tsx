import { siteConfig } from "@/src/config/site";

import "./globals.css";

import { Inter } from "next/font/google";

import BottomNavbar from "../components/layout/bottom-navbar";
import SideNavbar from "../components/layout/side-navbar";
import { Separator } from "../components/ui/separator";
import { Toaster } from "../components/ui/toaster";
import { cn } from "../lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={cn(inter.className)}>
      <body className="mx-auto h-screen md:flex md:max-w-6xl md:justify-center">
        <SideNavbar />
        <Separator className="hidden h-full w-[1px] md:block" />
        <main className="mb-20 flex-1 overflow-y-auto md:mb-0">{children}</main>
        <Separator className="hidden h-full w-[1px] md:block" />
        <BottomNavbar />
        <Toaster />
      </body>
    </html>
  );
}
