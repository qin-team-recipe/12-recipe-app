import Link from "next/link";

import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  id: string;
  avatar: string;
  name: string;
};

const ProfileLink = ({ id, avatar, name }: Props) => {
  return (
    <Link className="flex cursor-pointer items-center gap-x-1 hover:underline" href={`/chef/${id}`}>
      <Avatar className="h-6 w-6">
        <AvatarImage src={avatar} alt="profile" />
      </Avatar>
      <span>{name}</span>
    </Link>
  );
};

export default ProfileLink;
