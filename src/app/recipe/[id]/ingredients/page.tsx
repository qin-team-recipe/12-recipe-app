import CopyIconText from "@/src/components/copy-icon-text";
import IngredientList from "@/src/components/ingredient-list";
import { ShoppingCart } from "lucide-react";

const page = () => {
  return (
    <>
      <div className="flex justify-between border-b-2 px-2 pb-2 pt-5">
        {/* TODO: 2人前は取得したデータを渡してあげる */}
        <p className="text-xl font-bold">2人前</p>
        <div className="flex text-mauve9">
          <ShoppingCart size={20} />
          <p className="text-base font-bold">まとめてお買い物に追加</p>
        </div>
      </div>
      <IngredientList name={"キャベツ"} addedCartFlg={false} />
      <CopyIconText />
    </>
  );
};

export default page;
