import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import { getMyRecipes } from "@/src/actions/getMyRecipes";
import { sortSiteLinks } from "@/src/lib/utils";
import { ArrowLeft, CircleEllipsis } from "lucide-react";

import TopBar from "@/src/components/layout/top-bar";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import LinkableTabs from "@/src/components/linkable-tabs";
import NumberUnit from "@/src/components/number-unit";
import { Avatar, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { Separator } from "@/src/components/ui/separator";

import { tabs } from "./_constants/tabs";

export const metadata = {
  title: "マイページ",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/favorite");

  const sortedUserLinks = sortSiteLinks(user.UserLink.map((userLink) => userLink.url));

  const visibleLinks = sortedUserLinks.slice(0, 2);
  const moreLinks = sortedUserLinks.slice(2);

  const myRecipes = await getMyRecipes();

  return (
    <main className="block h-auto min-h-screen items-center md:w-[800px] md:max-w-[800px] md:border-x-[1px] md:border-x-border">
      <TopBar
        leadingComponent={
          <Link href={"/favorite"}>
            <ArrowLeft size={20} className="text-mauve12" />
          </Link>
        }
        trailingComponent={
          <div className="flex items-center gap-3">
            {visibleLinks && <LinkToIconRenderer links={visibleLinks.map((link) => link.url)} />}
            {moreLinks.length > 0 && (
              <Popover>
                <PopoverTrigger>
                  <CircleEllipsis size={20} />
                </PopoverTrigger>
                <PopoverContent align="end" className="p-2">
                  <Command className="w-full">
                    <CommandList>
                      {moreLinks.map((link, index) => (
                        <CommandItem key={index}>
                          <LinkToIconRenderer links={[link.url]} />
                          <span className="ml-2 text-lg">{link.label}</span>
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
        }
      />
      <div className="flex flex-col gap-4 py-5">
        {/* プロフィール部分 */}
        <div className="flex items-center justify-between px-4">
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
        <div className="px-4">{user.profile && <p className="flex-wrap text-mauve12">{user.profile}</p>}</div>

        {/* レシピ数・フォロー数 */}
        <div className="flex items-center gap-x-4 px-4">
          {<NumberUnit numbers={myRecipes.length} unit={"レシピ"} />}
          {<NumberUnit numbers={user.followersCount} unit={"フォロワー"} />}
        </div>

        <Link href={"/my-page/edit"} className="px-4">
          <Button className="w-full" variant={"outline"}>
            プロフィール編集
          </Button>
        </Link>

        <LinkableTabs tabs={tabs}>{children}</LinkableTabs>
        <Link href={"/my-recipe/create"} className="fixed inset-x-0 bottom-4 mx-auto w-52 text-mauve1">
          <Button variant={"destructive"} className="w-full rounded-full">
            マイレシピを追加する
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default layout;
