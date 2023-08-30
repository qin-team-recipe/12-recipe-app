import { siteConfig } from "@/src/config/site";

import "./globals.css";

import { Inter } from "next/font/google";

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
      <body className="min-h-screen md:mr-0 md:flex md:justify-center">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
