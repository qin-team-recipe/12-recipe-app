"use client";

import { deleteDraftRecipe } from "@/src/actions/deleteDraftRecipe";
import QueryParamsLink from "@/src/components/query-params-link";
import SelectableDialog from "@/src/components/selectable-dialog";
import { useToast } from "@/src/components/ui/use-toast";
import { kToastDuration } from "@/src/constants/constants";
import { Trash2 } from "lucide-react";

type Props = {
  id: string;
  title: string | null;
  createdAt: Date | null;
};

const DraftRecipeTile = ({ id, title, createdAt }: Props) => {
  const { toast } = useToast();

  return (
    <div className="flex w-full justify-between ">
      <QueryParamsLink path="/my-recipe/create" name="draftId" value={id} className="flex-1">
        <div className="flex flex-col">
          <p className="text-lg">{title ? title : "レシピ名未記載"}</p>
          {createdAt && (
            <p className="text-sm text-mauve10">
              作成日時:{" "}
              {new Date(createdAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </QueryParamsLink>
      <SelectableDialog
        title="確認"
        message="下書きレシピを削除しますか？"
        triggerComponent={<Trash2 size={20} />}
        onConfirm={async () => {
          const { isSuccess } = await deleteDraftRecipe(id);

          if (isSuccess) {
            toast({
              variant: "default",
              title: "下書きレシピを削除しました",
              duration: kToastDuration,
            });
          } else {
            toast({
              variant: "destructive",
              title: "下書きレシピの削除に失敗しました",
              duration: kToastDuration,
            });
          }
        }}
        confirmLabel="削除"
        cancelLabel="キャンセル"
      />
    </div>
  );
};

export default DraftRecipeTile;
