"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  name: string;
  value: string;
  path: string;
  children: React.ReactNode;
};

const QueryParamsLink = ({ name, value, path, children }: Props) => {
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams as unknown as URLSearchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return <Link href={path + "?" + createQueryString(name, value)}>{children}</Link>;
};

export default QueryParamsLink;
