"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  id: string;
  children: React.ReactNode;
};

export const ChefCard = async ({ id, children }: Props) => {
  const pathName = usePathname();

  const handleClick = () => {
    sessionStorage.setItem("previousPath", pathName);
  };

  return (
    <Link href={`/chef/${id}`} className="relative" onClick={handleClick}>
      {children}
    </Link>
  );
};
