"use client";

import { deleteRecipe } from "@/src/actions/deleteRecipe";
import { restoreRecipe } from "@/src/actions/restoreRecipe";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";

type Props = {
  recipeId: string;
};

const DeleteRecipeButton = ({ recipeId }: Props) => {
  const { toast, dismiss } = useToast();

  return (
    <>
      <form className="self-end">
        <input type="hidden" name="recipeId" value={recipeId} />
        <Button
          formAction={(formData: FormData) => {
            deleteRecipe(formData)
              .then(() => {
                toast({
                  variant: "default",
                  title: "レシピを削除しました",
                  action: (
                    <form>
                      <input type="hidden" name="recipeId" value={recipeId} />
                      <Button
                        formAction={(formData: FormData) => {
                          restoreRecipe(formData)
                            .then(() => {
                              dismiss();
                            })
                            .catch((_) => {
                              toast({
                                variant: "destructive",
                                title: "レシピの復元に失敗しました",
                              });
                            });
                        }}
                      >
                        復元
                      </Button>
                    </form>
                  ),
                });
              })
              .catch(() => {
                toast({
                  variant: "destructive",
                  title: "レシピの削除に失敗しました",
                });
              });
          }}
          className="w-fit bg-tomato11"
        >
          削除
        </Button>
      </form>
    </>
  );
};

export default DeleteRecipeButton;
