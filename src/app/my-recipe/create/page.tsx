import Link from "next/link";
import { redirect } from "next/navigation";

import { deleteDraftRecipe } from "@/src/actions/deleteDraftRecipe";
import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import { getDraftRecipe } from "@/src/actions/getDraftRecipe";

import TopBar from "@/src/components/layout/top-bar";

import { CreateRecipeForm, CreateRecipeFormValues } from "../../../components/create-recipe-form";
import CloseButton from "./_components/close-button";

const page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/login");

  let defaultValues: Partial<CreateRecipeFormValues> = {
    uid: user.id,
    title: "",
    bio: "",
    ingredients: [{ name: "" }],
    instructions: [{ value: "" }],
    urls: [{ value: "" }],
    servingCount: 1,
  };

  const draftId = searchParams["draftId"];

  if (draftId !== undefined) {
    const draftRecipe = await getDraftRecipe(draftId);

    if (!draftRecipe) {
      redirect("/my-page");
    }

    const {
      userId,
      title,
      description,
      servingCount,
      DraftIngredient: draftIngredient,
      DraftInstruction: draftInstruction,
      DraftRecipeImage: draftRecipeImage,
      DraftRecipeLink: draftRecipeLink,
    } = draftRecipe;

    defaultValues = {
      uid: userId,
      title: title || "",
      bio: description || "",
      ingredients:
        draftIngredient.filter((ingredient) => ingredient?.title).length > 0
          ? draftIngredient.map((ingredient) => {
              return {
                name: ingredient?.title || "",
              };
            })
          : [{ name: "" }],
      instructions:
        draftInstruction && draftInstruction.length > 0
          ? draftInstruction.map((instruction) => {
              return { value: String(instruction?.stepDescription) || "" };
            })
          : [{ value: "" }],
      urls:
        draftRecipeLink && draftRecipeLink.filter((url) => url?.linkUrl).length > 0
          ? draftRecipeLink.map((url) => {
              return { value: url?.linkUrl || "" };
            })
          : [{ value: "" }],
      servingCount: servingCount || 1,
    };

    await deleteDraftRecipe(draftId);
  }

  return (
    <>
      <TopBar
        leadingComponent={<CloseButton />}
        trailingComponent={
          <Link href="/my-recipe/drafts" className="text-xl font-bold text-mauve11">
            下書き一覧
          </Link>
        }
      />
      <CreateRecipeForm defaultValues={defaultValues} redirectPath="/my-page" />
    </>
  );
};

export default page;
