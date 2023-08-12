"use client";

import { useTransition } from "react";

import { patchMemoCompleteStatus } from "@/src/actions/patchMemoCompleteStatus";

export default function DoneMemo({ id, isCompleted }: { id: number; isCompleted: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <input
      onChange={() =>
        startTransition(() => {
          patchMemoCompleteStatus(id, isCompleted);
        })
      }
      checked={isCompleted}
      type="checkbox"
    />
  );
}
