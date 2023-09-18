import { cookies } from "next/headers";
import Link from "next/link";

import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AlignLeft, UserCircle2 } from "lucide-react";

import TopBar from "@/src/components/layout/top-bar";

export default async function Layout({
  authenticated,
  unauthenticated,
}: {
  authenticated: React.ReactNode;
  unauthenticated: React.ReactNode;
}) {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  return (
    <>
      <TopBar
        leadingComponent={
          <Link href={"/settings"}>
            <AlignLeft size={20} className="text-mauve12" />
          </Link>
        }
        centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">お気に入り</h1>}
        trailingComponent={
          session && (
            <Link href={"/my-page"}>
              <UserCircle2 size={20} className="text-mauve12" />
            </Link>
          )
        }
      />
      {session ? authenticated : unauthenticated}
    </>
  );
}
