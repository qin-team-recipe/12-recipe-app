import { notFound } from "next/navigation";

import { getChefById } from "@/src/actions/getChefById";

import RecipeCard from "@/src/components/recipe-card";

const page = async ({ params }: { params: { id: string } }) => {
  const { Recipe: recipes } = await getChefById({
    id: params?.id,
    orderByLikes: true,
  });

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 p-4">
        {recipes.map(({ id, likesCount, description, title, isPublished }) => (
          <li key={id}>
            <RecipeCard
              title={title}
              description={description}
              imageUrl="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
              favorites={likesCount}
              path={`/recipe/${id}`}
              isPublished={isPublished}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default page;
