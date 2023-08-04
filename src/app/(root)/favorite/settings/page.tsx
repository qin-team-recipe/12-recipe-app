'use client'

import TopBar from "@/src/components/layout/top-bar";
import { AlertCircle, ArrowLeft, ArrowUpRight, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import DeleteUserTile from "./_components/delete-user-tile";

const Page = () => {
  return (
    <>
      <TopBar
        leadingComponent={
          <div className="flex items-center gap-3">
            <Link href={"/favorite"}>
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-bold text-mauve12 md:text-xl">設定</h1>
          </div>
        }
      />
      <section className="mt-5 px-4">
        <h2 className="mb-3 text-lg font-bold">利用規約やお問い合わせ</h2>
        <Link href={"/terms"} className="flex h-12 items-center justify-between">
          利用規約
          <ChevronRight size={20} />
        </Link>
        <Link href={"/privacy_policy"} className="flex h-12 items-center justify-between">
          プライバシーポリシー
          <ChevronRight size={20} />
        </Link>
        <a href="https://google.com" target="_blank" className="flex h-12 items-center justify-between">
          会社概要
          <ArrowUpRight size={20} />
        </a>
        <a href="https://youtube.com" target="_blank" className="flex h-12 items-center justify-between">
          お問い合わせ
          <ArrowUpRight size={20} />
        </a>
      </section>
      <section className="mt-5 px-4">
        <h2 className="mb-3 text-lg font-bold">アカウントの操作</h2>
        <Link href={"/logout"} className="flex h-12 items-center justify-between">
          ログアウト
          <LogOut size={20} />
        </Link>
      </section>
      <section className="mt-5 px-4">
        <h2 className="mb-3 text-lg font-bold">取り消しができない操作</h2>
        <DeleteUserTile />
      </section>
    </>
  );
};

export default Page;
