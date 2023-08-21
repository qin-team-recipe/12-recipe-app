"use client";

import { useTransition } from "react";

import { deleteChefs } from "@/src/actions/deleteChefs";
import { kToastDuration } from "@/src/constants/constants";
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

  return (
    <Button
      variant="destructive"
      className="flex w-32 gap-2"
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
      {isPending ? <Spinner /> : <Trash2Icon size={12} />}
      <span className="">削除</span>
    </Button>
  );
};

export default DeleteChefButton;
