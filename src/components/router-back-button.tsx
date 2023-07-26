"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { cn } from "../lib/utils";

type Props = {
  className?: string;
  size: number;
};

const RouterBackButton = ({ className, size }: Props) => {
  const router = useRouter();

  const navigateBackOrToRootPage = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      // TODO: これは、戻るときにページを強制的に更新するためのハックなので、取得系APIを使うときには、
      // TODO: fetch()を使うなどして、キャッシュを使わないようにする必要がある。
      router.refresh();
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button onClick={navigateBackOrToRootPage}>
      <ArrowLeft size={size} className={cn(className)} />
    </button>
  );
};

export default RouterBackButton;
