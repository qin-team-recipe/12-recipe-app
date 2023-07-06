"use client";

import { useTransition } from "react";

import { doneMemo } from "@/src/actions/updateMemo";

export default function DoneMemo({ id, isCompleted }: { id: number; isCompleted: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <input onChange={() => startTransition(() => doneMemo(id, isCompleted))} checked={isCompleted} type="checkbox" />
  );
}
