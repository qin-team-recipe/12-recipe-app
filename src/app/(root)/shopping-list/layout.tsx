import { cookies } from "next/headers";

import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import TopBar from "@/src/components/layout/top-bar";
import SuggestLogin from "@/src/components/suggest-login";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  return (
    <>
      <TopBar centerComponent={<div className="font-bold text-mauve12 md:text-xl">買い物リスト</div>} />
      {session ? <>{children}</> : <SuggestLogin page="ShoppingList" />}
    </>
  );
};

export default layout;
