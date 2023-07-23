import Link from "next/link";

import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  id: string;
  imagePath: string;
  name: string;
};

const ProfileLink = ({ id, imagePath, name }: Props) => {
  return (
    <Link className="flex cursor-pointer items-center gap-x-1 hover:underline" href={`/chef/${id}`}>
      <Avatar className="h-6 w-6">
        <AvatarImage src={imagePath} alt={name} />
      </Avatar>
      <span className="text-lg text-mauve11">{name}</span>
    </Link>
  );
};

export default ProfileLink;
