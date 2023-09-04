import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ROLE_TYPE } from "@/src/constants/constants";
import type { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient, Session } from "@supabase/auth-helpers-nextjs";

import TopBar from "@/src/components/layout/top-bar";

import { AdminLoginForm } from "./_components";

export const metadata = {
  title: "管理者ログイン画面",
};

const isUser = (session: Session | null) => {
  const isUserRole = session?.user.user_metadata.role === ROLE_TYPE.USER;
  const isGithubLogin = session?.user.app_metadata.provider === "github";
  return isUserRole || isGithubLogin;
};

const isAdmin = (session: Session | null) => {
  return session && session.user.user_metadata.role !== ROLE_TYPE.USER;
};

const AdminLoginPage = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (isUser(session)) return redirect("/");
  if (isAdmin(session)) return redirect("/admin");

  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">管理者ログイン</h1>} />
      <AdminLoginForm />
    </>
  );
};

export default AdminLoginPage;
