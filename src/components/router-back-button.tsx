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
    const previousPath = sessionStorage.getItem("previousPath");

    if (path) {
      router.push(path);
      return;
    }

    if (previousPath) {
      router.push(previousPath);
      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
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
