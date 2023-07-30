"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Database } from "@/src/types/SupabaseTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClientComponentClient<Database>();
    await supabase.auth.signOut();

    router.refresh();
    router.push("/");
  };

  return (
    <>
      <p>設定</p>
      <Button onClick={handleSignOut}>Sign out</Button>
    </>
  );
};

export default page;
