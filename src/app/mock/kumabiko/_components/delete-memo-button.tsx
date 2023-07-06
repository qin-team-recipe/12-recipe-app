"use client";

import { useTransition } from "react";

import { deleteMemo } from "@/src/actions/deleteMemo";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

const DeleteMemoButton = ({ id }: { id: number }) => {
  const [isPending, startTransition] = useTransition();

  return <Button onClick={() => startTransition(() => deleteMemo(id))}>{isPending ? <Spinner /> : "削除"}</Button>;
};

export default DeleteMemoButton;
