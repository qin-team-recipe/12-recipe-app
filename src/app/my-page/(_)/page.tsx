import { getMyRecipes } from "@/src/actions/getMyRecipes";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeCard from "@/src/components/recipe-card";

const page = async () => {
  const myRecipes = await getMyRecipes({ orderByLikes: false });

  return (
    <>
      {myRecipes.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 p-4">
          {myRecipes.map(({ id, _count, description, title }) => (
            <li key={id} className="flex flex-col">
              <RecipeCard
                path={`/my-recipe/${id}`}
                favorites={_count.likes}
                description={description}
                title={title}
                imageUrl="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
              />
            </li>
          ))}
        </ul>
      ) : (
        <NoDataDisplay text="まだレシピが作成されていません。" />
      )}
    </>
  );
};

export default page;
