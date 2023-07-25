import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import { searchRecipesAndChefs } from "@/src/actions/searchRecipesAndChefs";
import TopBar from "@/src/components/layout/top-bar";
import RecipeCard from "@/src/components/recipe-card";
import SearchInput from "@/src/components/search-input";
import { Separator } from "@/src/components/ui/separator";

import DeleteRecipeButton from "../_components/delete-recipe-button";
import { NewRecipeForm } from "../_components/new-recipe-form";

const page = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const searchQuery = searchParams.search ?? "";

  const user = await getAuthenticatedUser();

  const { searchedRecipes } = await searchRecipesAndChefs(searchQuery);

  return (
    <div className="mb-20 p-4">
      <h2 className="pt-2 text-2xl font-extrabold">レシピ作成</h2>
      <NewRecipeForm />
      <Separator className="my-2" />
      <h2 className="pt-2 text-2xl font-extrabold">レシピ一覧</h2>
      <TopBar centerComponent={<SearchInput />} />
      {searchedRecipes && searchedRecipes.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {searchedRecipes.map((recipe) => (
              <div key={recipe.id} className="flex flex-col gap-2">
                <RecipeCard
                  path={`/mock/tsuboi/${recipe.id}`}
                  favorites={recipe.likes.length}
                  description={recipe.description}
                  title={recipe.title}
                  imageUrl={
                    recipe.RecipeImage[0]?.recipeImage ||
                    "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
                  }
                />
                {user?.role === "ADMIN" && <DeleteRecipeButton recipeId={recipe.id} />}
              </div>
            ))}
          </div>
        </>
      )}
      {searchQuery.length > 0 && searchedRecipes.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-4">
          <img
            className="mx-auto mb-4 h-80 w-80"
            src="https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/61bf07d2cce98fb122df3dd3_1.png"
            alt="No result"
          />
          <p className="font-bold text-mauve12">該当する検索結果がありませんでした。</p>
        </div>
      )}
    </div>
  );
};

export default page;
