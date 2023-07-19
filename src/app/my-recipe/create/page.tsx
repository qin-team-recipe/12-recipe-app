import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import TopBar from "@/src/components/layout/top-bar";

import { CreateRecipeForm, CreateRecipeFormValues } from "../../../components/create-recipe-form";
import CloseButton from "./_components/close-button";

const page = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    // TODO: 未ログイン時のリダイレクト先を変更する
    redirect("/mock/unauthorized");
  }

  const defaultValues: Partial<CreateRecipeFormValues> = {
    uid: user.id,
    title: "",
    bio: "",
    ingredients: [{ name: "" }],
    instructions: [{ value: "" }],
    urls: [{ value: "" }],
    servingCount: 1,
  };

  return (
    <>
      <TopBar
        leadingComponent={<CloseButton />}
        trailingComponent={
          <Link href="/my-recipe/drafts">
            <button className="text-xl font-bold text-mauve11">下書き一覧</button>
          </Link>
        }
      />
      <CreateRecipeForm defaultValues={defaultValues} redirectPath="/my-page" />
    </>
  );
};

export default page;
