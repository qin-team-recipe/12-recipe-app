import { getRecipesNewFromFollowedChefs } from "@/src/actions/getRecipesNewFromFollowedChefs";
import { getBlurDataURL } from "@/src/lib/images";

import BlurImage from "@/src/components/blur-image";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeCard from "@/src/components/recipe-card";

const HorizontalNewRecipesList = async () => {
  const newRecipesFromFollowingChefs = await getRecipesNewFromFollowedChefs({ limit: 5 });

  return (
    <>
      {newRecipesFromFollowingChefs.length > 0 ? (
        <ul className="mt-2 flex w-screen gap-x-2 overflow-x-scroll px-4 md:w-full">
          {newRecipesFromFollowingChefs.map(async ({ id, title, description, RecipeImage, _count }) => {
            const imageUrl = RecipeImage[0]?.recipeImage;

            return (
              <li key={id} className="flex w-[160px] flex-none flex-col">
                <RecipeCard
                  title={title}
                  description={description}
                  favorites={_count.likes}
                  path={`/recipe/${id}`}
                  isPublished={true}
                  imageComponent={
                    <BlurImage
                      src={imageUrl || "/images/recipe-placeholder.png"}
                      className="h-auto w-full rounded-2xl object-cover"
                      alt={title}
                      width={160}
                      height={160}
                      placeholder="blur"
                      priority
                      blurDataURL={await getBlurDataURL(imageUrl || "/images/recipe-placeholder.png")}
                    />
                  }
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <NoDataDisplay text="まだフォローしているシェフの新着レシピはありません。" />
      )}
    </>
  );
};

export default HorizontalNewRecipesList;
