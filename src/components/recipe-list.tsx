type Props = {
  recipeText: string;
  stepNumber: number;
};

// レシピリスト
export const RecipeStep = ({ recipeText, stepNumber }: Props) => {
  return (
    <div className="flex items-start gap-x-2 py-2 border-y px-2">
      <div className="mt-px flex items-center justify-center h-5 w-5 text-sm shrink-0 select-none rounded-full bg-tomato11 text-mauve1">
        {stepNumber}
      </div>
      <div className="flex-1 leading-snug text-mauve12">{recipeText}</div>
    </div>
  );
};
