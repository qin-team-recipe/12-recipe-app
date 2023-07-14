import Link from "next/link";
import { notFound } from "next/navigation";

import { getChefById } from "@/src/actions/getChefById";
import TopBar from "@/src/components/layout/top-bar";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import LinkableTabs from "@/src/components/linkable-tabs";
import NumberUnit from "@/src/components/number-unit";
import { Avatar, AvatarImage } from "@/src/components/ui/avatar";
import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CONSTANTS } from "@/src/constants/constants";
import { sortUserLinks } from "@/src/lib/utils";
import { ArrowLeft, CircleEllipsis } from "lucide-react";

import FollowButton from "../../../_components/follow-button";
import { tabs } from "./_constants/tabs";

const layout = async ({ params, children }: { params: { id: string }; children: React.ReactNode }) => {
  const chef = await getChefById({
    id: params.id,
  });

  if (!chef) return notFound();

  const { id, name, profile, followersCount, isFollowing, UserLink: userLinks, isMe, _count } = chef;

  const sortedUserLinks = sortUserLinks(userLinks);

  const visibleLinks = sortedUserLinks.slice(0, 2);
  const moreLinks = sortedUserLinks.slice(2);

  return (
    <div className="mb-20">
      <TopBar
        leadingComponent={
          <Link href={"/mock/tsuboi/chefs"}>
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
                          <span className="ml-2 text-lg">{link.siteName}</span>
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
      <div className="flex flex-col gap-4 px-4 py-5">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="grid gap-1 text-mauve12">
              <h2 className="text-xl font-bold">{name}</h2>
              <h6>{id}</h6>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage
                // TODO: シェフのアバター画像を表示する
                src={
                  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
                }
                alt={name}
              />
            </Avatar>
          </div>
          {profile && <p className="text-mauve12">{profile}</p>}
        </div>
        <div className="flex items-center gap-x-4">
          {_count.Recipe > 0 && <NumberUnit numbers={_count.Recipe} unit={CONSTANTS.RECIPE} />}
          <NumberUnit numbers={followersCount} unit={CONSTANTS.FOLLOWER} />
        </div>
        {!isMe && <FollowButton followedId={id} isActive={isFollowing} />}
      </div>
      <LinkableTabs tabs={tabs(params.id)}>{children}</LinkableTabs>
    </div>
  );
};

export default layout;
