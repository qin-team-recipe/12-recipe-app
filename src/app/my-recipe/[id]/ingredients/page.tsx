import { getRecipeById } from "@/src/actions/getRecipeById";
import { cn } from "@/src/lib/utils";
import { ShoppingCart } from "lucide-react";

import AddAllToCartButton from "./_components/add-all-to-cart-button";
import CopyToClipboardButton from "./_components/copy-to-clipboard-button";

const page = async ({ params }: { params: { id: string } }) => {
  const { Ingredient: ingredients, servingCount, title, isAllInCart } = await getRecipeById(params.id);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b p-4">
        <h2 className="text-xl font-bold">{servingCount}人前</h2>
        <AddAllToCartButton
          recipeId={params.id}
          isAllInCart={isAllInCart}
          ingredientIds={ingredients.map(({ id }) => id)}
        />
      </div>
      {ingredients.map(({ title, id }) => (
        <ul key={id}>
          <li className="flex justify-between border-b px-4 py-2">
            <p className="">{title}</p>
            <button className=" pl-[20px] text-mauve11 hover:text-mauve12">
              {/* // TODO: お買い物リストに追加するロジックを実装する */}
              <ShoppingCart size={20} />
            </button>
          </li>
        </ul>
      ))}
      <CopyToClipboardButton
        recipeName={title}
        servingCount={servingCount}
        ingredients={ingredients.map(({ title }) => ({
          title,
        }))}
      />
    </div>
  );
};

export default page;
