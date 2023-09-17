import { cookies } from "next/headers";
import Link from "next/link";

import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AlignLeft, UserCircle2 } from "lucide-react";

import TopBar from "@/src/components/layout/top-bar";

export default async function Layout({ view, login }: { view: React.ReactNode; login: React.ReactNode }) {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">買い物リスト</h1>} />
      {session ? view : login}
    </>
  );
}
