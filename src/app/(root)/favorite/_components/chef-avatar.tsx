"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarImage } from "@/src/components/ui/avatar";

type Props = {
  id: string;
  profileImage: string | null;
  name: string;
};

const ChefAvatar = ({ id, profileImage, name }: Props) => {
  const pathName = usePathname();

  const handleClick = () => {
    sessionStorage.setItem("previousPath", pathName);
  };

  return (
    <Link href={`/chef/${id}`} onClick={handleClick}>
      <Avatar className="h-[64px] w-[64px]">
        <AvatarImage src={profileImage || "/images/chef-placeholder.png"} alt={name} />
      </Avatar>
    </Link>
  );
};

export default ChefAvatar;
