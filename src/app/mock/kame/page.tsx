import { getFavoriteRecipes } from "@/src/actions/getFavoriteRecipes";
import getMyRecipes from "@/src/actions/getMyRecipes";

const page = async () => {
  const myRecipes = await getMyRecipes();
  console.log(myRecipes);

  return <div>kameのmock page</div>;
};

export default page;
