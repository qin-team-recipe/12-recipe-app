import Image from "next/image";

import { getRecipeById } from "@/src/actions/getRecipeById";
import { cn, sortSiteLinks } from "@/src/lib/utils";
import { CircleEllipsis } from "lucide-react";

import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import RouterBackButton from "@/src/components/router-back-button";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import PopoverMenu from "@/src/app/my-recipe/[id]/_components/popover-menu";

import RecipeInfoStats from "./recipe-info-stats";

type Props = {
  id: string;
};

const RecipeHero = async ({ id }: Props) => {
  const {
    title,
    description,
    isMe,
    RecipeLink: recipeLinks,
    _count,
    isFavorite,
    user,
    RecipeImage: recipeImage,
    isPublished,
  } = await getRecipeById(id);

  const sortedRecipeLinks = sortSiteLinks(recipeLinks.map((recipeLink) => recipeLink.linkUrl));

  const visibleLinks = sortedRecipeLinks.slice(0, 2);
  const moreLinks = sortedRecipeLinks.slice(2);

  return (
    <>
      <div className={cn(recipeImage[0].recipeImage && "relative aspect-square")}>
        {recipeImage[0].recipeImage && (
          <Image
            src={recipeImage[0].recipeImage}
            sizes="100vw"
            className="h-auto w-full object-cover"
            alt={title}
            width={160}
            height={160}
          />
        )}
        <div
          className={cn(
            recipeImage[0].recipeImage ? "absolute left-5 top-5" : "pl-4 pt-4",
            "cursor-pointer stroke-white hover:stroke-mauve2"
          )}
        >
          <RouterBackButton size={32} path="/my-page" className="rounded-full bg-[#040013]/[.48] text-mauve1" />
        </div>
      </div>
      <div className="grid gap-4 p-4">
        <div className="grid gap-4">
          <div className="flex justify-between">
            <h6 className="text-xl font-bold text-mauve12">{title}</h6>
            <div className="ml-3 flex items-center gap-3">
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

              {isMe && <PopoverMenu recipeId={id} isPublished={isPublished} />}
            </div>
          </div>
          <p className="text-mauve12">{description}</p>
        </div>
        <RecipeInfoStats
          {...{
            recipeId: id,
            isActive: isFavorite,
            favoriteCount: _count.likes,
            userId: user.id,
            userName: user.name,
            profileImage: user.profileImage,
          }}
        />
      </div>
    </>
  );
};

export default RecipeHero;
