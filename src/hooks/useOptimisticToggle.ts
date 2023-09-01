import { experimental_useOptimistic as useOptimistic } from "react";

import { useToast } from "@/src/components/ui/use-toast";

import { ActionsResult } from "../types/ActionsResult";

type Props = {
  count: number;
  isActive: boolean;
  activeAction: (id: string) => Promise<ActionsResult>;
  inactiveAction: (id: string) => Promise<ActionsResult>;
};

export const useOptimisticToggle = ({ count, isActive, activeAction, inactiveAction }: Props) => {
  const [optimisticState, setOptimisticState] = useOptimistic({ count, isActive });
  const { toast } = useToast();

  const updateCount = async (id: string) => {
    const currentState = { ...optimisticState };

    setOptimisticState((prev) =>
      isActive
        ? {
            count: prev.count - 1,
            isActive: false,
          }
        : {
            count: prev.count + 1,
            isActive: true,
          }
    );

    const action = isActive ? inactiveAction : activeAction;

    const result = await action(id);

    if (!result.isSuccess) {
      setOptimisticState(currentState);
      toast({
        variant: "destructive",
        title: result.error,
      });
    }
  };

  return {
    optimisticState,
    updateCount,
  };
};
