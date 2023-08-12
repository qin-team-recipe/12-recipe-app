"use client";

import { patchMemoCompleteStatus } from "@/src/actions/patchMemoCompleteStatus";
import { useToast } from "@/src/components/ui/use-toast";
import { kToastDuration } from "@/src/constants/constants";
import { cn } from "@/src/lib/utils";
import { Check } from "lucide-react";

type Props = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  form: any;
  index: number;
};

const CheckButton = ({ isChecked, form, setIsChecked, index }: Props) => {
  const { toast } = useToast();

  const handleCheck = async () => {
    const memoId = form.getValues(`memo.${index}.id`);
    const result = await patchMemoCompleteStatus(memoId, isChecked);
    if (result.isSuccess) {
      setIsChecked((prev) => !prev);
    } else {
      toast({
        variant: "destructive",
        title: result.error,
        duration: kToastDuration,
      });
    }
  };

  return (
    <button
      aria-label={isChecked ? "Uncheck item" : "Check item"}
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2",
        isChecked
          ? "flex h-5 w-5 items-center justify-center rounded-full border-mauve1 bg-mauve8 p-1 text-mauve1"
          : "h-5 w-5 rounded-full border-2 border-tomato9 p-1"
      )}
      onClick={handleCheck}
    >
      {isChecked && <Check />}
    </button>
  );
};

export default CheckButton;
