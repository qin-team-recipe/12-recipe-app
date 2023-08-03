'use client'

import TopBar from "@/src/components/layout/top-bar";
import SettingListTile from "@/src/components/setting-list";
import { AlertCircle, ArrowLeft, ArrowUpRight, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter()
  const handleClick = (actionType: string) => {
    if (actionType === "terms") {
      router.push('/terms')
    } else if (actionType === "privacy_policy") {
      router.push('/privacy_policy')
    } else if (actionType === "company") {
      window.open('https://google.com', '_blank')
    } else if (actionType === "contact") {
      window.open('https://youtube.com', '_blank')
    } else if (actionType === "modal") {
      console.log("modal")
    }
  }
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
      <section className="my-3">
        <h2 className="ml-4 text-lg font-bold">利用規約やお問い合わせ</h2>
        <div className="mb-8">
          <SettingListTile onClick={() => handleClick("terms")} icon={ChevronRight} title="利用規約" />
          <SettingListTile onClick={() => handleClick("privacy_policy")} icon={ChevronRight} title="プライバシーポリシー" />
          <SettingListTile onClick={() => handleClick("company")} icon={ArrowUpRight} title="運営会社" />
          <SettingListTile onClick={() => handleClick("contact")} icon={ArrowUpRight} title="お問い合わせ" />
        </div>
      </section>
      <section className="my-3">
        <h2 className="ml-4 text-lg font-bold">アカウントの操作</h2>
        <div className="mb-8">
          <SettingListTile onClick={() => handleClick("modal")} icon={LogOut} title="ログアウト" />
        </div>
      </section>
      <section className="my-3">
        <h2 className="ml-4 text-lg font-bold">取り消しができない操作</h2>
        <div className="mb-8">
          <SettingListTile onClick={() => handleClick("modal")} icon={AlertCircle} title="退会する" />
        </div>
      </section>  
    </>
  );
};

export default Page;
