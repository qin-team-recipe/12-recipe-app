import { getChefById } from "@/src/actions/getChefById";
import { getBlurDataURL } from "@/src/lib/images";
import { sortSiteLinks } from "@/src/lib/utils";
import { CircleEllipsis } from "lucide-react";

import BlurImage from "@/src/components/blur-image";
import TopBar from "@/src/components/layout/top-bar";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import RecipeCard from "@/src/components/recipe-card";
import RouterBackButton from "@/src/components/router-back-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

const page = async ({ params }: { params: { chefId: string } }) => {
  const {
    id,
    name,
    profile,
    Recipe: recipes,
    UserLink: userLinks,
    profileImage,
  } = await getChefById({
    id: params?.chefId,
  });

  const sortedUserLinks = sortSiteLinks(userLinks.map((userLink) => userLink.url));

  const visibleLinks = sortedUserLinks.slice(0, 2);
  const moreLinks = sortedUserLinks.slice(2);
  const avatarFallbackName = name.slice(0, 2);

  return (
    <>
      <TopBar
        leadingComponent={<RouterBackButton path={`/admin`} size={20} />}
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
      </div>
      <ul className="grid grid-cols-2 gap-4 p-4">
        {recipes.map(async ({ id, likesCount, description, title, isPublished, RecipeImage }) => {
          const recipeImage = RecipeImage[0]?.recipeImage;

          return (
            <li key={id}>
              <RecipeCard
                title={title}
                description={description}
                favorites={likesCount}
                path={`/admin/${params?.chefId}/recipe/${id}`}
                isPublished={isPublished}
                imageComponent={
                  <BlurImage
                    src={recipeImage || "/images/recipe-placeholder.png"}
                    className="h-auto w-full rounded-2xl object-cover"
                    alt={title}
                    width={160}
                    height={160}
                    placeholder="blur"
                    priority
                    blurDataURL={await getBlurDataURL(recipeImage || "/images/recipe-placeholder.png")}
                  />
                }
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default page;
