import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function page() {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (session) {
    redirect("/mock");
  }

  return (
    <>
      <h1>Unauthenticated</h1>
    </>
  );
}
