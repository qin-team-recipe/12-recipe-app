import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import getAuthenticatedUser from "@/src/actions/getAuthenticatedUser";
import getFavoriteRecipes from "@/src/actions/getFavoriteRecipes";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function FavoriteRecipe() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/mock/unauthenticated");
  }
  const user = await getAuthenticatedUser();

  const favoriteRecipes = await getFavoriteRecipes(user?.id);

  return (
    <div>
      {favoriteRecipes.map((fr) => (
        <>
          <p>レシピのidは【{fr.recipe.id}】</p>
          <p>レシピのタイトルは【{fr.recipe.title}】</p>
          <p>レシピの人数は【{fr.recipe.servingCount}】</p>
        </>
      ))}
    </div>
  );
}
