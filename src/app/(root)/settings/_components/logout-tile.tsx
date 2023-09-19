"use client";

import { useRouter } from "next/navigation";

import { kToastDuration } from "@/src/constants/constants";
import { ApiResponse } from "@/src/types/ApiResponse";
import { LogOut } from "lucide-react";

import SelectableDialog from "@/src/components/selectable-dialog";
import { useToast } from "@/src/components/ui/use-toast";

const LogoutTile = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await fetch("/api/sign-out", {
      method: "POST",
    });

    const responseJson: ApiResponse = await response.json();

    if (response.ok) {
      if ("message" in responseJson) {
        toast({
          title: responseJson.message,
          variant: "default",
          duration: kToastDuration,
        });
        router.refresh();
        router.push("/");
      }
    } else {
      if ("error" in responseJson) {
        toast({
          title: responseJson.error,
          variant: "destructive",
          duration: kToastDuration,
        });
      }
    }

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
      className="w-full rounded-md px-2 hover:bg-mauve4"
      onConfirm={async () => {
        await handleSignOut();
      }}
      confirmLabel="ログアウト"
      cancelLabel="キャンセル"
    />
  );
};

export default LogoutTile;
