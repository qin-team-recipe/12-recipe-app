import { getChefById } from "@/src/actions/getChefById";
import { sortSiteLinks } from "@/src/lib/utils";
import { CircleEllipsis } from "lucide-react";

import TopBar from "@/src/components/layout/top-bar";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import LinkableTabs from "@/src/components/linkable-tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

import RouterBackButton from "../../../../components/router-back-button";
import UserProfileStats from "./_components/user-profile-stats";
import { tabs } from "./_constants/tabs";

const layout = async ({ params, children }: { params: { id: string }; children: React.ReactNode }) => {
  const {
    id,
    name,
    profile,
    followersCount,
    isFollowing,
    UserLink: userLinks,
    isMe,
    profileImage,
    _count,
  } = await getChefById({
    id: params?.id,
  });

  const sortedUserLinks = sortSiteLinks(userLinks.map((userLink) => userLink.url));

  const visibleLinks = sortedUserLinks.slice(0, 2);
  const moreLinks = sortedUserLinks.slice(2);
  const avatarFallbackName = name.slice(0, 2);

  return (
    <>
      <TopBar
        leadingComponent={<RouterBackButton size={20} />}
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
      <div className="flex flex-col gap-4 px-4 py-5">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="grid gap-1 text-mauve12">
              <h2 className="text-xl font-bold">{name}</h2>
              <h6>{id}</h6>
            </div>
            <Avatar className="h-16 w-16">
              {profileImage ? (
                <AvatarImage src={profileImage} alt={name} />
              ) : (
                <AvatarFallback>{avatarFallbackName}</AvatarFallback>
              )}
            </Avatar>
          </div>
          {profile && <p className="text-mauve12">{profile}</p>}
        </div>
        <UserProfileStats
          {...{ isMe, followersCount, recipeCount: _count.Recipe, followedId: id, isActive: isFollowing }}
        />
      </div>
      <LinkableTabs tabs={tabs(params?.id)}>{children}</LinkableTabs>
    </>
  );
};

export default layout;
