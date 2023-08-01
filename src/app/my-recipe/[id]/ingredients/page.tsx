import { getRecipeById } from "@/src/actions/getRecipeById";
import { ShoppingCart } from "lucide-react";

import CopyToClipboardButton from "./_components/copy-to-clipboard-button";

const page = async ({ params }: { params: { id: string } }) => {
  const { Ingredient: ingredients, servingCount, title } = await getRecipeById(params.id);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b p-4">
        <h2 className="text-xl font-bold">{servingCount}人前</h2>
        <button
          className="flex items-center gap-2 font-bold"
          // TODO: まとめてお買い物リストに追加するロジックを実装する
        >
          <ShoppingCart size={20} />
          <span>まとめてお買い物リストに追加</span>
        </button>
      </div>
      <ul>
        {ingredients.map(({ title, id }) => (
          <li key={id} className="flex justify-between border-b px-4 py-2">
            <p className="">{title}</p>
            <button className=" pl-[20px] text-mauve11 hover:text-mauve12">
              {/* // TODO: お買い物リストに追加するロジックを実装する */}
              <ShoppingCart size={20} />
            </button>
          </li>
        ))}
      </ul>
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
