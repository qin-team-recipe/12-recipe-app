import Link from "next/link";

import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  path: string;
  imageUrl: string;
  chefName: string;
};

// お気に入りシェフアイコン
export const ChefIcon = ({ path, imageUrl, chefName }: Props) => {
  return (
    <div className="flex w-[68px] flex-col items-center">
      <Link href={path}>
        <Avatar className="h-[68px] w-[68px]">
          <AvatarImage src={imageUrl} alt={chefName} />
        </Avatar>
      </Link>
      <p className="mt-1 line-clamp-1 text-center text-sm leading-[14px] text-primary">{chefName}</p>
    </div>
  );
};
