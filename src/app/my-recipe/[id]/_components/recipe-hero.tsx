import Image from "next/image";

import { getRecipeById } from "@/src/actions/getRecipeById";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import RouterBackButton from "@/src/components/router-back-button";
import { sortSiteLinks } from "@/src/lib/utils";

import PopoverMenu from "./popover-menu";
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
    isPublished,
  } = await getRecipeById(id);

  const sortedRecipeLinks = sortSiteLinks(recipeLinks.map((value) => value.linkUrl));

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
          <RouterBackButton size={32} path="/my-page" className="rounded-full bg-[#040013]/[.48] text-mauve1" />
        </div>
      </div>
      <div className="grid gap-4 p-4">
        <div className="grid gap-4">
          <div className="flex justify-between">
            <h6 className="text-xl font-bold text-mauve12">{title}</h6>
            <div className="ml-3 flex items-center gap-3">
              {recipeLinks && <LinkToIconRenderer links={sortedRecipeLinks.map((value) => value.url)} />}
              {isMe && <PopoverMenu recipeId={id} isPublished={isPublished} />}
            </div>
          </div>
          <p className="text-mauve12">{description}</p>
        </div>
        <RecipeInfoStats recipeId={id} isActive={isFavorite} isPublished={isPublished} favoriteCount={_count?.likes} />
      </div>
    </>
  );
};

export default RecipeHero;
