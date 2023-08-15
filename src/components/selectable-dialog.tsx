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

import { Button } from "./ui/button";
import Spinner from "./ui/spinner";

type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel: string;
  onCancel?: () => void;
  cancelLabel: string;
  triggerComponent: React.ReactNode;
};

const SelectableDialog = ({
  confirmLabel,
  message,
  onConfirm,
  title,
  cancelLabel,
  onCancel,
  triggerComponent,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger onClick={() => setIsOpen(true)}>{triggerComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="self-center">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm">{message}</p>
        <DialogFooter className="flex gap-2">
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => {
              startTransition(() => {
                onConfirm();
              });
            }}
          >
            {isPending ? <Spinner /> : confirmLabel}
          </Button>
          <Button
            className="flex-1 border-tomato7 text-tomato11"
            variant="outline"
            onClick={() => {
              startTransition(() => {
                if (onCancel) onCancel();
                setIsOpen(false);
              });
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
