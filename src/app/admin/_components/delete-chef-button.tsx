"use client";

import { useTransition } from "react";

import { deleteChefs } from "@/src/actions/deleteChefs";
import { kToastDuration } from "@/src/constants/constants";
import { useWindowSize } from "@/src/hooks/useWindowSize";
import { cn } from "@/src/lib/utils";
import { Trash2Icon } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";

type Props = {
  chefIds: string[];
  onSuccessfulDelete(): void;
};

const DeleteChefButton = ({ chefIds, onSuccessfulDelete }: Props) => {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const { isMobile } = useWindowSize();

  return (
    <Button
      variant="destructive"
      className={cn(!isMobile && "flex gap-2", "w-fit")}
      onClick={() => {
        startTransition(async () => {
          const result = await deleteChefs(chefIds);

          if (result.isSuccess) {
            onSuccessfulDelete();

            toast({
              title: result.message,
              duration: kToastDuration,
            });
          } else {
            toast({
              variant: "destructive",
              title: result.error,
            });
          }
        });
      }}
    >
      {isPending ? <Spinner /> : <Trash2Icon size={12} className={cn(isMobile && "self-center")} />}
      <span className="whitespace-nowrap">{isMobile ? null : "削除"}</span>
    </Button>
  );
};

export default DeleteChefButton;
