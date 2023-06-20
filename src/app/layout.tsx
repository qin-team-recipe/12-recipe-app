import { siteConfig } from "@/src/config/site";

import "./globals.css";

import { Inter } from "next/font/google";

import BottomNavbar from "../components/layout/bottom-navbar";
import SideNavbar from "../components/layout/side-navbar";
import { Separator } from "../components/ui/separator";
import { Toaster } from "../components/ui/toaster";

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
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex h-full md:max-w-6xl mx-auto">
          <SideNavbar />
          <Separator className="w-[1px] h-screen hidden md:block" />
          <main className="flex-1 overflow-y-auto mb-20 md:mb-0">{children}</main>
          <Separator className="w-[1px] h-screen hidden md:block" />
        </div>
        <BottomNavbar />
        <Toaster />
      </body>
    </html>
  );
}
