import { getRecipeById } from "@/src/actions/getRecipeById";
import { getBlurDataURL } from "@/src/lib/images";
import { cn, sortSiteLinks } from "@/src/lib/utils";

import BlurImage from "@/src/components/blur-image";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import RouterBackButton from "@/src/components/router-back-button";

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
    RecipeImage: recipeImage,
  } = await getRecipeById(id);

  const sortedRecipeLinks = sortSiteLinks(recipeLinks.map((value) => value.linkUrl));

  return (
    <>
      <div className={cn(recipeImage[0].recipeImage && "relative aspect-square")}>
        {recipeImage[0].recipeImage && (
          <BlurImage
            src={recipeImage[0].recipeImage}
            className="h-auto w-full object-cover"
            alt={title}
            width={160}
            height={160}
            placeholder="blur"
            priority
            blurDataURL={await getBlurDataURL(recipeImage[0].recipeImage || "/images/recipe-placeholder.png")}
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
        <div className="flex justify-between">
          <h6 className="text-xl font-bold text-mauve12">{title}</h6>
          <div className="ml-3 flex items-center gap-3">
            {recipeLinks && <LinkToIconRenderer links={sortedRecipeLinks.map((value) => value.url)} />}
            {isMe && <PopoverMenu recipeId={id} isPublished={isPublished} />}
          </div>
        </div>
        <p className="line-clamp-3 text-mauve12">{description}</p>
        <RecipeInfoStats recipeId={id} isActive={isFavorite} isPublished={isPublished} favoriteCount={_count?.likes} />
      </div>
    </>
  );
};

export default RecipeHero;
