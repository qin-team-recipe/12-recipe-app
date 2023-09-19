"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { kToastDuration } from "@/src/constants/constants";
import { ApiResponse } from "@/src/types/ApiResponse";
import { AlertCircle } from "lucide-react";

import SelectableDialog from "@/src/components/selectable-dialog";
import { useToast } from "@/src/components/ui/use-toast";

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
      className="w-full rounded-md px-2 hover:bg-mauve4"
      onConfirm={handleClick}
      confirmLabel="退会する"
      cancelLabel="キャンセル"
    />
  );
};

export default DeleteUserTile;
