import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserRole } from "@/src/actions/getUserRole";
import { ROLE_TYPE } from "@/src/constants/constants";
import type { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import TopBar from "@/src/components/layout/top-bar";

import { AdminLoginForm, LoginFormValues } from "./_components";

export const metadata = {
  title: "管理者ログイン画面",
};

const AdminLoginPage = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  // ログイン済かつロールがUSERの場合はルートへリダイレクト
  if (session && session.user.user_metadata.role === ROLE_TYPE.USER) redirect("/");
  // ログイン済かつロールがUSERではない場合はロールがADMINと判断して/adminへリダイレクト
  if (session && session.user.user_metadata.role !== ROLE_TYPE.USER) redirect("/admin");

  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">管理者ログイン</h1>} />
      <AdminLoginForm />
    </>
  );
};

export default AdminLoginPage;
