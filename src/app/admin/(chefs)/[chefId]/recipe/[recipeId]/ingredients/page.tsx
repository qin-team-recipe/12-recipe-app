import { getRecipeById } from "@/src/actions/getRecipeById";
import { ShoppingCart } from "lucide-react";

const page = async ({ params }: { params: { recipeId: string; chefId: string } }) => {
  const { Ingredient: ingredients, servingCount } = await getRecipeById(params.recipeId);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b p-4">
        <h2 className="text-xl font-bold">{servingCount}人前</h2>
      </div>
      {ingredients.map(({ title, id }) => (
        <ul key={id}>
          <li className="flex justify-between border-b px-4 py-2">
            <p className="">{title}</p>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default page;
