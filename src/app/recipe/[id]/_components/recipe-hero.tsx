import Image from "next/image";

import { getRecipeById } from "@/src/actions/getRecipeById";
import FavoriteButton from "@/src/app/my-recipe/[id]/_components/favorite-button";
import PopoverMenu from "@/src/app/my-recipe/[id]/_components/popover-menu";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import NumberUnit from "@/src/components/number-unit";
import ProfileLink from "@/src/components/profile-link";
import RouterBackButton from "@/src/components/router-back-button";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CONSTANTS } from "@/src/constants/constants";
import { sortSiteLinks } from "@/src/lib/utils";
import { CircleEllipsis } from "lucide-react";

import RecipeInfoStats from "./recipe-info-stats";

type Props = {
  id: string;
};

const RecipeHero = async ({ id }: Props) => {
  const { title, description, isMe, RecipeLink: recipeLinks, _count, isFavorite, user } = await getRecipeById(id);

  const sortedRecipeLinks = sortSiteLinks(recipeLinks.map((recipeLink) => recipeLink.linkUrl));

  const visibleLinks = sortedRecipeLinks.slice(0, 2);
  const moreLinks = sortedRecipeLinks.slice(2);

  return (
    <>
      {/* // TODO: 画像を設定する */}
      <div className="relative aspect-square">
        <Image
          src={
            "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
          layout="responsive"
          className="w-full"
          alt={title}
          width={160}
          height={160}
        />
        <div className="absolute left-5 top-5 cursor-pointer stroke-white hover:stroke-mauve2">
          <RouterBackButton size={32} className="rounded-full bg-[#040013]/[.48] text-mauve1" />
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

              {isMe && <PopoverMenu recipeId={id} />}
            </div>
          </div>
          <p className="text-mauve12">{description}</p>
        </div>
        <RecipeInfoStats
          {...{ recipeId: id, isActive: isFavorite, favoriteCount: _count.likes, userId: user.id, userName: user.name }}
        />
      </div>
    </>
  );
};

export default RecipeHero;
