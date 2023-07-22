import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import TopBar from "@/src/components/layout/top-bar";

import CloseButton from "./_components/close-button";
import { CreateRecipeForm } from "./_components/create-recipe-form";

const page = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    // TODO: 未ログイン時のリダイレクト先を変更する
    redirect("/mock/unauthorized");
  }

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
      <CreateRecipeForm />
    </>
  );
};

export default page;
