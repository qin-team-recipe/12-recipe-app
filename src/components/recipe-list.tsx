type Props = {
  recipeText: string;
  annotation: string;
  orderNum: number;
};

// レシピリスト
export const RecipeListItem = ({ recipeText, annotation, orderNum }: Props) => {
  return (
    <div className="flex px-[12px] py-[8px] border-b-[1px]">
      <div className="mr-[8px]">
        <span className="flex justify-center w-[18px] h-[18px] rounded-full bg-[#CA3214] text-white text-[12px]">{orderNum}</span>
      </div>
      <div>
        <p className="text-[14px] leading-4 mb-[8px]">{recipeText}</p>
        <p className="text-[10px] text-[#86848D]">※{annotation}</p>
      </div>
    </div>
  );
};
