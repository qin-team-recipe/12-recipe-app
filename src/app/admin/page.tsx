import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getChefs } from "@/src/actions/getChefs";
import { ROLE_TYPE } from "@/src/constants/constants";
import type { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient, Session } from "@supabase/auth-helpers-nextjs";

import { ChefsDataTable } from "./_components/chefs-data-table";

const isAuthenticatedAdmin = (session: Session | null) => {
  if (!session) return false;
  const isUserRole = session.user.user_metadata.role === ROLE_TYPE.USER;
  const isGithubLogin = session.user.app_metadata.provider === "github";
  return !(isUserRole || isGithubLogin);
};

const page = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!isAuthenticatedAdmin(session)) return redirect("/admin/login");

  const data = await getChefs();

  return (
    <div className="p-4">
      <ChefsDataTable data={data.chefs} />
    </div>
  );
};

export default page;
