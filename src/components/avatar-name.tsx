import React from "react";
import Link from "next/link";

import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  chefId: number;
  avatar: string;
  name: string;
};

const AvatarName = ({ chefId, avatar, name }: Props) => {
  return (
    <Link className="flex items-center gap-x-1 cursor-pointer hover:underline" href={`/chef/${chefId}`}>
      <Avatar className="h-5 w-5 rounded-full">
        <AvatarImage src={avatar} alt={avatar} />
      </Avatar>
      <span>{name}</span>
    </Link>
  );
};

export default AvatarName;
