import getFavoriteRecipes from "@/src/actions/getFavoriteRecipes";

const page = async () => {
  const favoriteRecipes = await getFavoriteRecipes();
  console.log(favoriteRecipes);

  return <div>kameのmock page</div>;
};

export default page;
