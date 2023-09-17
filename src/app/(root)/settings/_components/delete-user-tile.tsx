"use client";

import { useRouter } from "next/navigation";

import { kToastDuration } from "@/src/constants/constants";
import { AlertCircle } from "lucide-react";

import SelectableDialog from "@/src/components/selectable-dialog";
import { useToast } from "@/src/components/ui/use-toast";
import { ApiResponse } from "@/src/app/api/delete-user/route";

const DeleteUserTile = () => {
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = async () => {
    const response = await fetch("/api/delete-user", {
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
  };

  return (
    <SelectableDialog
      title="確認"
      message="本当に退会しますか？"
      triggerComponent={
        <div className="flex h-12 w-full cursor-pointer items-center justify-between">
          退会する
          <AlertCircle size={20} />
        </div>
      }
      className="w-full"
      onConfirm={handleClick}
      confirmLabel="退会する"
      cancelLabel="キャンセル"
    />
  );
};

export default DeleteUserTile;
