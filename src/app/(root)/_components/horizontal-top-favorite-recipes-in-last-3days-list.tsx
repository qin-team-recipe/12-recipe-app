import { getTopFavoriteRecipesInLast3Days } from "@/src/actions/getTopFavoriteRecipesInLast3Days";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeCard from "@/src/components/recipe-card";

const HorizontalTopFavoriteRecipesInLast3DaysList = async () => {
  const topFavoriteRecipesInLast3Days = await getTopFavoriteRecipesInLast3Days();

  return (
    <>
      {topFavoriteRecipesInLast3Days.length > 0 ? (
        <ul className="flex w-screen gap-x-2  overflow-x-scroll px-4 md:w-full">
          {/* TODO: 「もっと見る」の遷移先があるので、表示させる件数を制限する */}
          {topFavoriteRecipesInLast3Days.map(({ id, title, description, RecipeImage, likes, likeCount }) => (
            <li key={id} className="mt-2 w-[160px] flex-none">
              <RecipeCard
                title={title}
                description={description}
                // TODO: 画像を設定する
                imageUrl="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
                favorites={likeCount}
                path={`/recipes/${id}`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <NoDataDisplay text="過去３日間でお気に入り登録されたレシピはありません。" />
      )}
    </>
  );
};

export default HorizontalTopFavoriteRecipesInLast3DaysList;
