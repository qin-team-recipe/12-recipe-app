import React from "react";
import Link from "next/link";

import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  chefId: number;
  avatar: string;
  name: string;
};

const ProfileLink = ({ chefId, avatar, name }: Props) => {
  return (
    <Link className="flex cursor-pointer items-center gap-x-1 hover:underline" href={`/chef/${chefId}`}>
      <Avatar className="h-5 w-5">
        <AvatarImage src={avatar} alt="profile" />
      </Avatar>
      <span>{name}</span>
    </Link>
  );
};

export default ProfileLink;
