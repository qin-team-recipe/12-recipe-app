import { getMyFavoriteRecipes } from "@/src/actions/getMyFavoriteRecipes";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeCard from "@/src/components/recipe-card";

const MyFavoriteRecipesGrid = async () => {
  const myFavoriteRecipes = await getMyFavoriteRecipes();

  // TODO: 無限スクロールに対応する
  return (
    <>
      {myFavoriteRecipes.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 p-4">
          {myFavoriteRecipes.map(({ id, title, description, _count }) => (
            <li key={id} className="flex flex-col">
              <RecipeCard
                title={title}
                description={description}
                imageUrl="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
                favorites={_count.likes}
                path={`/recipe/${id}`}
              />
            </li>
          ))}
        </ul>
      ) : (
        <NoDataDisplay text="まだお気に入りのレシピはありません。" />
      )}
    </>
  );
};

export default MyFavoriteRecipesGrid;
