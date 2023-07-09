type Props = {
  recipeText: string;
  stepNumber: number;
};

export const RecipeStep = ({ recipeText, stepNumber }: Props) => {
  return (
    <div className="flex items-start gap-x-2 border-y p-2">
      <div className="mt-px flex h-5 w-5 shrink-0 select-none items-center justify-center rounded-full bg-tomato11 text-sm text-mauve1">
        {stepNumber}
      </div>
      <div className="flex-1 leading-snug text-mauve12">{recipeText}</div>
    </div>
  );
};
