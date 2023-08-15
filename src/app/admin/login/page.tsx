import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserRole } from "@/src/actions/getUserRole";
import TopBar from "@/src/components/layout/top-bar";
import type { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { AdminLoginForm, LoginFormValues } from "./_components";

export const metadata = {
  title: "管理者ログイン画面",
};

const AdminLoginPage = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  const role = await getUserRole(session?.user.id);

  if (role !== undefined && role === "ADMIN") redirect("/admin");

  const defaultValues: LoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">管理者ログイン</h1>} />
      <AdminLoginForm defaultValues={defaultValues} />
    </>
  );
};

export default AdminLoginPage;
