"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <div className="p-2">
      <h2>{error.message}</h2>
      <Button variant={"outline"} onClick={() => router.back()}>
        mockページ
      </Button>
    </div>
  );
}
