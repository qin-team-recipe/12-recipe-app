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
    <div className="flex flex-col items-center w-[68px]">
      <Link href={routingUrl}>
        <Avatar className="h-[68px] w-[68px]">
          <AvatarImage src={imageUrl} alt={chefName} />
        </Avatar>
      </Link>
      <p className="text-base text-primary mt-1 line-clamp-2 leading-[14px] text-center">{chefName}</p>
    </div>
  );
};
