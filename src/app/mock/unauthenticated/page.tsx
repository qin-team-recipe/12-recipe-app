import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/mock");
  }

  return (
    <>
      <h1>Unauthenticated</h1>
    </>
  );
}
