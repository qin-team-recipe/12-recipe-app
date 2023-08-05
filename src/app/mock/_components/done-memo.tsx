"use client";

import { useTransition } from "react";

import { putMemo } from "@/src/actions/putMemo";

export default function DoneMemo({ id, isCompleted }: { id: number; isCompleted: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <input
      onChange={() =>
        startTransition(() => {
          putMemo(id, isCompleted);
        })
      }
      checked={isCompleted}
      type="checkbox"
    />
  );
}
