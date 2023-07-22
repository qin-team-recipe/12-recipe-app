import { getRecipeById } from "@/src/actions/getRecipeById";

const page = async ({ params }: { params: { id: string } }) => {
  const { Ingredient: ingredients, servingCount } = await getRecipeById(params.id);

  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-xl font-bold">{servingCount}人前</h2>
        <div className="flex flex-col">
          {ingredients.map(({ title, id }) => (
            <div key={id}>{title}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
