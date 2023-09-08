"use client";

import { useRouter } from "next/navigation";

import { Database } from "@/src/types/SupabaseTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LogOut } from "lucide-react";

import SelectableDialog from "@/src/components/selectable-dialog";

const LogoutTile = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClientComponentClient<Database>();
    await supabase.auth.signOut();

    router.refresh();
    router.push("/");
  };

  return (
    <SelectableDialog
      title="確認"
      message="ログアウトしますか？"
      triggerComponent={
        <div className="flex h-12 w-full cursor-pointer items-center justify-between">
          ログアウト
          <LogOut size={20} />
        </div>
      }
      className="w-full"
      onConfirm={async () => {
        await handleSignOut();
      }}
      confirmLabel="ログアウト"
      cancelLabel="キャンセル"
    />
  );
};

export default LogoutTile;
