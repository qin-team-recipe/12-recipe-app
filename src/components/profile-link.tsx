import Link from "next/link";

import { AvatarFallback } from "@radix-ui/react-avatar";

import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  id: string;
  imagePath: string | null;
  name: string;
};

const ProfileLink = ({ id, imagePath, name }: Props) => {
  return (
    <Link className="flex cursor-pointer items-center gap-x-1 hover:underline" href={`/chef/${id}`}>
      <Avatar className="h-6 w-6">
        {imagePath ? <AvatarImage src={imagePath} alt={name} /> : <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>}
      </Avatar>
      <span className="text-lg text-mauve11">{name}</span>
    </Link>
  );
};

export default ProfileLink;
