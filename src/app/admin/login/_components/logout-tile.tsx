"use client";

import { useRouter } from "next/navigation";

import { kToastDuration } from "@/src/constants/constants";
import { ApiResponse } from "@/src/types/ApiResponse";

import SelectableDialog from "@/src/components/selectable-dialog";
import { Button } from "@/src/components/ui/button";
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
        <Button variant="destructive" className="flex-1 gap-2">
          ログアウト
        </Button>
      }
      onConfirm={async () => {
        await handleSignOut();
      }}
      confirmLabel="ログアウト"
      cancelLabel="キャンセル"
    />
  );
};

export default LogoutTile;
