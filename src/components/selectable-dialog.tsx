"use client";

import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { useWindowSize } from "../hooks/useWindowSize";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import Spinner from "./ui/spinner";

type Props = {
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  confirmLabel: string;
  onCancel?: () => void;
  cancelLabel: string;
  triggerComponent: React.ReactNode;
  className?: string;
};

const SelectableDialog = ({
  confirmLabel,
  message,
  onConfirm,
  title,
  cancelLabel,
  onCancel,
  triggerComponent,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const { isDesktop } = useWindowSize();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger className={cn(className)} onClick={() => setIsOpen(true)}>
        {triggerComponent}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="self-center text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-center text-lg">{message}</p>
        <DialogFooter className="flex gap-2">
          <Button
            size={isDesktop ? "sm" : "default"}
            className="flex-1"
            variant="outline"
            onClick={() => {
              startTransition(async () => {
                await onConfirm();
                setIsOpen(false);
              });
            }}
          >
            {isPending ? <Spinner /> : confirmLabel}
          </Button>
          <Button
            size={isDesktop ? "sm" : "default"}
            className="flex-1 border-tomato7 text-tomato11"
            variant="outline"
            onClick={() => {
              if (onCancel) onCancel();
              setIsOpen(false);
            }}
          >
            {cancelLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectableDialog;
