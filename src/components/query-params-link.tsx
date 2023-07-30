"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "../lib/utils";

type Props = {
  name: string;
  value: string;
  path: string;
  children: React.ReactNode;
  className?: string;
};

const QueryParamsLink = ({ name, value, path, children, className }: Props) => {
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as unknown as URLSearchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Link className={cn(className)} href={path + "?" + createQueryString(name, value)}>
      {children}
    </Link>
  );
};

export default QueryParamsLink;
