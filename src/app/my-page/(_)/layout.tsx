import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import { getMyRecipes } from "@/src/actions/getMyRecipes";
import TopBar from "@/src/components/layout/top-bar";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import LinkableTabs from "@/src/components/linkable-tabs";
import NumberUnit from "@/src/components/number-unit";
import { Avatar, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { CONSTANTS } from "@/src/constants/constants";
import { sortUserLinks } from "@/src/lib/utils";
import { ArrowLeft } from "lucide-react";

import AdminPopoverMenu from "./_components/admin-popover-menu";
import { tabs } from "./_constants/tabs";

export const metadata = {
  title: "マイページ",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    // TODO: 未ログイン時のリダイレクト先を変更する
    redirect("/mock/unauthorized");
  }
  const sortedUserLinks = sortUserLinks(user.UserLink);

  const myRecipes = await getMyRecipes({ orderByLikes: false });

  return (
    <div className="mb-20">
      <TopBar
        leadingComponent={
          <Link href={"/favorite"}>
            <ArrowLeft size={20} className="text-mauve12" />
          </Link>
        }
        trailingComponent={
          <div className="flex items-center gap-3">
            {sortedUserLinks && <LinkToIconRenderer links={sortedUserLinks.map((link) => link.url)} />}
            {user.role === "ADMIN" && <AdminPopoverMenu />}
          </div>
        }
      />
      <div className="flex flex-col gap-4 px-4 py-5">
        {/* プロフィール部分 */}
        <div className="flex items-center justify-between">
          <div className="grid gap-1 text-mauve12">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <h6>{user.id}</h6>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage
              // TODO: シェフのアバター画像を表示する
              src={
                "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
              }
              alt={user.name}
            />
          </Avatar>
        </div>

        {/* 自己紹介 */}
        <div>{user.profile && <p className="flex-wrap text-mauve12">{user.profile}</p>}</div>

        {/* レシピ数・フォロー数 */}
        <div className="flex items-center gap-x-4">
          {myRecipes.length > 0 && <NumberUnit numbers={myRecipes.length} unit={CONSTANTS.RECIPE} />}
        </div>

        <Link href={"/my-page/edit"}>
          <Button className="w-full border border-mauve9 text-mauve12" variant={"outline"}>
            プロフィール編集
          </Button>
        </Link>
      </div>

      <LinkableTabs tabs={tabs}>{children}</LinkableTabs>
    </div>
  );
};

export default layout;
