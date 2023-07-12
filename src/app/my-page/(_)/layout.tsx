import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import { getMyRecipes } from "@/src/actions/getMyRecipes";
import TopBar from "@/src/components/layout/top-bar";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import LinkableTabs from "@/src/components/linkable-tabs";
import { Button } from "@/src/components/ui/button";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { sortUserLinks } from "@/src/lib/utils";
import { ArrowLeft, CircleEllipsis, Copy, Pencil } from "lucide-react";

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

  const myRecipes = await getMyRecipes({ orderByLikes: false });
  const sortedUserLinks = sortUserLinks(user.UserLink);

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
            <Popover>
              <PopoverTrigger>
                <CircleEllipsis size={20} />
              </PopoverTrigger>
              <PopoverContent align="end" className="p-2">
                <Command className="w-full">
                  <CommandList>
                    <CommandItem>
                      <Link href={"/my-page/edit"} className="flex">
                        <Pencil size={16} className="mr-2 h-4 w-4" />
                        <span>プロフィールを編集する</span>
                      </Link>
                    </CommandItem>
                    <CommandItem>
                      {/* // TODO: URLをコピーする */}
                      <Copy className="mr-2 h-4 w-4" />
                      <span>URLをコピーする</span>
                    </CommandItem>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        }
      />
      <div className="flex flex-col gap-4 px-4 py-5">
        <h2 className="text-2xl font-bold text-mauve12">{user.name}</h2>
        <p>
          <span className="font-bold">{myRecipes.length}</span> レシピ
        </p>
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
