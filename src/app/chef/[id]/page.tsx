import { Metadata, ResolvingMetadata } from "next";

import { getChefById } from "@/src/actions/getChefById";
import { kInfiniteScrollCount } from "@/src/constants/constants";

import LoadMore from "@/src/components/load-more";
import NoDataDisplay from "@/src/components/no-data-display";
import RecipeList from "@/src/components/recipe-list";

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const chef = await getChefById({ id: params?.id });
  if (!chef) {
    return {};
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: chef.name,
    description: chef.profile,
    openGraph: {
      images: chef.profileImage ? [...previousImages, chef.profileImage] : [...previousImages],
    },
  };
}

const page = async ({ params }: PageProps) => {
  const { Recipe: initialRecipes } = await getChefById({
    id: params?.id,
    limit: kInfiniteScrollCount,
  });

  const loadMoreRecipe = async (offset: number = 0) => {
    "use server";

    const { Recipe: recipes } = await getChefById({
      id: params.id,
      skip: offset + kInfiniteScrollCount,
      limit: kInfiniteScrollCount,
    });

    const nextOffset = offset + recipes.length;

    return [
      recipes.map((recipe) => <RecipeList key={recipe.id} recipes={[recipe]} path="recipe" />),
      nextOffset,
    ] as const;
  };

  return (
    <>
      {initialRecipes.length > 0 ? (
        <LoadMore initialOffset={0} loadMoreAction={loadMoreRecipe}>
          <RecipeList recipes={initialRecipes} path="recipe" />
        </LoadMore>
      ) : (
        <NoDataDisplay text="まだレシピが作成されていません。" />
      )}
    </>
  );
};

export default page;
