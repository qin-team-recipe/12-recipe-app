import { siteConfig } from "@/src/config/site";

import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "../components/ui/toaster";
import { cn } from "../lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Server Components", "Server Actions", "レシピ", "料理", "お料理"],
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
