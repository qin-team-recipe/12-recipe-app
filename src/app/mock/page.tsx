import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import RecipeCard from "@/src/components/recipe-card";
import { Separator } from "@/src/components/ui/separator";
import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import NewRecipe from "./_components/new-recipe";

const page = async () => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    redirect("/mock/unauthenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const recipesWithLikes = await prisma.recipe.findMany({
    include: {
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="pt-4">
      <h4 className="text-xl font-medium leading-none">🙌 Hello {user?.name} 🙌</h4>
      <Separator className="my-2" />
      <NewRecipe />
      <Separator className="my-2" />
      <h2 className="text-2xl font-extrabold pt-2">レシピ一覧</h2>
      <div className="pt-4 grid grid-cols-2 gap-4">
        {recipesWithLikes?.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard
              favorites={recipe.likes.length}
              comment={recipe.content}
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
