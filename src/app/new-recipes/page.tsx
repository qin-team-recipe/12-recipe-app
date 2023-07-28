import { getNewRecipesFromFollowingChefs } from "@/src/actions/getNewRecipesFromFollowingChefs";
import TopBar from "@/src/components/layout/top-bar";
import RecipeCard from "@/src/components/recipe-card";
import RouterBackButton from "@/src/components/router-back-button";

const page = async () => {
  const recipes = await getNewRecipesFromFollowingChefs({});

  return (
    <>
      <TopBar
        leadingComponent={
          <div className="flex items-center gap-3">
            <RouterBackButton size={20} />
            <h1 className="font-bold text-mauve12 md:text-xl">新着レシピ</h1>
          </div>
        }
      />
      <ul className="grid grid-cols-2 gap-4 px-4 py-5">
        {recipes.map(({ id, description, title }) => (
          <li key={id}>
            <RecipeCard
              title={title}
              description={description}
              imageUrl="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
              favorites={0}
              path={`/recipes/${id}`}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default page;
