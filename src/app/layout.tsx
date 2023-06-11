import { siteConfig } from "@/src/config/site";

import "./globals.css";

import { Inter } from "next/font/google";

import BottomNavbar from "../components/bottom-navbar";
import SideNavbar from "../components/side-navbar";
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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full max-w-6xl mx-auto">
          <SideNavbar />
          <main className="flex-1 overflow-y-auto py-2 md:py-4 mb-20 md:mb-0">{children}</main>
        </div>
        <BottomNavbar />
        <Toaster />
      </body>
    </html>
  );
}
