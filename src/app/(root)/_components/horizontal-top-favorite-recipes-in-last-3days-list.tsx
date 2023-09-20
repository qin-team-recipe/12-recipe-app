import { getRecipesTopFavoritesInLast3Days } from "@/src/actions/getRecipesTopFavoritesInLast3Days";
import { getBlurDataURL } from "@/src/lib/images";

import BlurImage from "@/src/components/blur-image";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeCard from "@/src/components/recipe-card";

const HorizontalTopFavoriteRecipesInLast3DaysList = async () => {
  const topFavoriteRecipesInLast3Days = await getRecipesTopFavoritesInLast3Days({ limit: 10 });

  return (
    <>
      {topFavoriteRecipesInLast3Days.length > 0 ? (
        <ul className="mt-2 flex w-screen gap-x-2 overflow-x-scroll px-4 md:w-full">
          {topFavoriteRecipesInLast3Days.map(
            async ({ id, title, description, RecipeImage, likes, likeCount, isPublished }) => {
              const imageUrl = RecipeImage[0]?.recipeImage;

              return (
                <li key={id} className="flex w-[160px] flex-none flex-col">
                  <RecipeCard
                    isPublished={isPublished}
                    title={title}
                    description={description}
                    favorites={likeCount}
                    path={`/recipe/${id}`}
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
            }
          )}
        </ul>
      ) : (
        <NoDataDisplay text="過去３日間でお気に入り登録されたレシピはありません。" />
      )}
    </>
  );
};

export default HorizontalTopFavoriteRecipesInLast3DaysList;
