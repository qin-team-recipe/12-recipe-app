import { cookies } from "next/headers";
import Link from "next/link";

import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeft, ArrowUpRight, ChevronRight, LogOut } from "lucide-react";

import TopBar from "@/src/components/layout/top-bar";

import DeleteUserTile from "./_components/delete-user-tile";
import LogoutTile from "./_components/logout-tile";

const Page = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

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
      <section className="mt-5 px-2">
        <h2 className="mb-3 px-2 text-lg font-bold">利用規約やお問い合わせ</h2>
        <Link
          href={"settings/terms"}
          className="flex h-12 items-center justify-between rounded-md px-2 hover:bg-mauve4"
        >
          利用規約
          <ChevronRight size={20} />
        </Link>
        <Link
          href={"/privacy_policy"}
          className="flex h-12 items-center justify-between rounded-md px-2 hover:bg-mauve4"
        >
          プライバシーポリシー
          <ChevronRight size={20} />
        </Link>
        <a
          href="https://google.com"
          target="_blank"
          className="flex h-12 items-center justify-between rounded-md px-2 hover:bg-mauve4"
        >
          会社概要
          <ArrowUpRight size={20} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          className="flex h-12 items-center justify-between rounded-md px-2 hover:bg-mauve4"
        >
          お問い合わせ
          <ArrowUpRight size={20} />
        </a>
      </section>
      {session && (
        <>
          <section className="mt-5 px-2">
            <h2 className="mb-3 px-2 text-lg font-bold">アカウントの操作</h2>
            <LogoutTile />
          </section>
          <section className="mt-5 px-2">
            <h2 className="mb-3 px-2 text-lg font-bold">取り消しができない操作</h2>
            <DeleteUserTile />
          </section>
        </>
      )}
    </>
  );
};

export default Page;
