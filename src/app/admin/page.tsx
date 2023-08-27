import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getChefs } from "@/src/actions/getChefs";
import { getUserRole } from "@/src/actions/getUserRole";
import { ROLE_TYPE } from "@/src/constants/constants";
import type { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { ChefsDataTable } from "./_components/chefs-data-table";

const page = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  // ログイン済ではない場合
  if (!session) return redirect("/admin/login");

  if (session.user.user_metadata.role === ROLE_TYPE.USER) {
    // ログイン済かつroleが存在する場合USERロールと判断してルートにリダイレクトする(シェフとadminは23/8/27時点ではroleを持たない)
    return redirect("/admin/login");
  }

  const data = await getChefs();

  return (
    <div className="p-4">
      <ChefsDataTable data={data.chefs} />
    </div>
  );
};

export default page;
