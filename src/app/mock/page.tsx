import getAuthenticatedUser from "@/src/actions/get-authenticated-user";
import getRecipes from "@/src/actions/get-recipes";
import RecipeCard from "@/src/components/recipe-card";
import { Separator } from "@/src/components/ui/separator";

import NewRecipe from "./_components/new-recipe";

const page = async () => {
  const myRecipes = await getRecipes();

  const user = await getAuthenticatedUser();

  return (
    <div className="pt-4">
      <h4 className="text-xl font-medium leading-none">🙌 Hello {user?.name} 🙌</h4>
      <Separator className="my-2" />
      <NewRecipe />
      <Separator className="my-2" />
      <h2 className="text-2xl font-extrabold pt-2">レシピ一覧</h2>
      <div className="pt-4 grid grid-cols-2 gap-4">
        {myRecipes?.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard
              favorites={recipe.likes.length}
              comment={recipe.description}
              recipeName={recipe.title}
              imageUrl="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
              recipeId={recipe.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
