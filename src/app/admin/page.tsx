import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getChefs } from "@/src/actions/getChefs";
import { getUserRole } from "@/src/actions/getUserRole";
import type { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { ChefsDataTable } from "./_components/chefs-data-table";

const page = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  const role = await getUserRole(session?.user.id);
  if (role === undefined || role !== "ADMIN") redirect("/admin/login");

  const data = await getChefs();

  return (
    <div className="p-4">
      <ChefsDataTable data={data.chefs} />
    </div>
  );
};

export default page;
