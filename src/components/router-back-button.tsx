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

  const navigateBackOrToChefPage = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.refresh();
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button onClick={navigateBackOrToChefPage}>
      <ArrowLeft size={size} className={cn(className)} />
    </button>
  );
};

export default RouterBackButton;
