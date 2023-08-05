"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { cn } from "../lib/utils";

type Props = {
  className?: string;
  size: number;
  path?: string;
};

const RouterBackButton = ({ className, size, path }: Props) => {
  const router = useRouter();

  const navigateBackOrToRootPage = () => {
    if (path) {
      router.push(path);
      return;
    }

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
    <button onClick={navigateBackOrToRootPage} aria-label="戻る">
      <ArrowLeft size={size} className={cn(className)} />
    </button>
  );
};

export default RouterBackButton;
