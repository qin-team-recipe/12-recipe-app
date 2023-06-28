import Link from "next/link";

import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  routingUrl: string;
  imageUrl: string;
  chefName: string;
};

// お気に入りシェフアイコン
export const ChefIcon = ({ routingUrl, imageUrl, chefName }: Props) => {
  return (
    <div className="flex w-[68px] flex-col items-center">
      <Link href={routingUrl}>
        <Avatar className="h-[68px] w-[68px]">
          <AvatarImage src={imageUrl} alt={chefName} />
        </Avatar>
      </Link>
      <p className="mt-1 line-clamp-2 text-center text-base leading-[14px] text-primary">{chefName}</p>
    </div>
  );
};
