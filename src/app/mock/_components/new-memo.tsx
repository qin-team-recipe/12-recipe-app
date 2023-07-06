"use client";

import { useRef } from "react";

import { addMemo } from "@/src/actions/addMemo";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export default function NewMemo() {
  const formRef = useRef<HTMLFormElement>(null);
  const add = async (data: FormData) => {
    await addMemo(data);
    if (formRef.current) formRef.current.reset();
  };
  return (
    <form action={add} className="flex flex-col items-center justify-center gap-2 pt-2">
      <h2 className="self-start text-2xl font-extrabold">メモ</h2>

      <div className="grid w-full max-w-screen-sm items-center gap-1.5">
        <Label htmlFor="email-2">メモ</Label>
        <Input name="title" placeholder="title" />
      </div>
      <Button type="submit" className="self-end">
        Add
      </Button>
    </form>
  );
}
