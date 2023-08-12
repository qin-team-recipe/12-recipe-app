"use client";

import { useRouter } from "next/navigation";

import { Database } from "@/src/types/SupabaseTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LogOut } from "lucide-react";

const LogoutTile = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClientComponentClient<Database>();
    await supabase.auth.signOut();

    router.refresh();
    router.push("/");
  };

  return (
    <button onClick={handleSignOut} className="flex h-12 w-full cursor-pointer items-center justify-between">
      ログアウト
      <LogOut size={20} />
    </button>
  );
};

export default LogoutTile;
