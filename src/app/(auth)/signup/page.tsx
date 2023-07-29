import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import TopBar from "@/src/components/layout/top-bar";
import type { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import SignUpForm from "./_components/signup-form";

// サインアップページ
const SignUpPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 認証している場合、リダイレクト
  if (session) {
    redirect("/");
  }

  const defaultValues = { name: "", email: "", password: "" };

  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">サインアップ</h1>} />
      <SignUpForm defaultValues={defaultValues} />
    </>
  );
};

export default SignUpPage;
