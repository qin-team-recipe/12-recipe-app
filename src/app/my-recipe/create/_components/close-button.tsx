"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { X } from "lucide-react";

const CloseButton = () => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  return (
    // TODO: 下書き保存の処理を実装する
    <button className="flex h-8 w-8 items-center justify-center rounded-full text-mauve12">
      {isEditing ? (
        <Dialog>
          <DialogTrigger>
            <X size={20} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>確認</DialogTitle>
            </DialogHeader>
            <p className="text-sm">作成中のレシピは保存されません。 下書きに保存しますか？</p>
            <DialogFooter>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  router.push("/my-page");
                }}
              >
                保存
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <X
          size={20}
          onClick={() => {
            setIsEditing(false);
            router.push("/my-page");
          }}
        />
      )}
    </button>
  );
};

export default CloseButton;
