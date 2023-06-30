import getChefs from "@/src/actions/getChefs";
import getRecipes from "@/src/actions/getRecipes";

export const searchRecipesAndChefs = async (searchQuery: string) => {
  const [recipes, chefs] = await Promise.all([getRecipes(), getChefs()]);

  const search = searchQuery.toLowerCase();

  const filteredRecipes = recipes.filter(({ title, description }) => {
    return title.toLowerCase().includes(search) || description.toLowerCase().includes(search);
  });
  const filteredChefs = chefs.filter(({ name }) => {
    return name.toLowerCase().includes(search);
  });

  const searchedRecipes = searchQuery.length > 0 ? filteredRecipes : recipes;
  const searchedChefs = searchQuery.length > 0 ? filteredChefs : chefs;

  return { searchedRecipes, searchedChefs };
};
