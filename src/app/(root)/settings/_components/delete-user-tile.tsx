"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { kToastDuration } from "@/src/constants/constants";
import { useWindowSize } from "@/src/hooks/useWindowSize";
import { cn } from "@/src/lib/utils";
import { ApiResponse } from "@/src/types/ApiResponse";
import { AlertCircle } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";

const DeleteUserTile = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const { isDesktop } = useWindowSize();

  const [inputValue, setInputValue] = useState("");

  const handleClickDeleteUser = async () => {
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
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger className={cn("w-full rounded-md px-2 hover:bg-mauve4")} onClick={() => setIsOpen(true)}>
        <div className="flex h-12 w-full cursor-pointer items-center justify-between">
          退会する <AlertCircle size={20} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="self-center text-2xl">本当に退会しますか？</DialogTitle>
        </DialogHeader>
        <p className="text-center text-lg">deleteを記入してください</p>
        <Input
          className="w-full rounded-md border px-4"
          placeholder="delete"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <DialogFooter className="flex gap-2">
          <Button
            size={isDesktop ? "sm" : "default"}
            className="flex-1"
            variant="outline"
            onClick={() => {
              startTransition(async () => {
                await handleClickDeleteUser();
                setIsOpen(false);
              });
            }}
            disabled={"delete" !== inputValue}
          >
            {isPending ? <Spinner /> : "退会する"}
          </Button>
          <Button
            size={isDesktop ? "sm" : "default"}
            className="flex-1 border-tomato7 text-tomato11"
            variant="outline"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            キャンセル
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserTile;
