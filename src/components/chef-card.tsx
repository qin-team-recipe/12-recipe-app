import Image from "next/image";
import Link from "next/link";

type Props = {
  path: string;
  imageUrl: string;
  chefName: string;
};

export const ChefCard = ({ path, imageUrl, chefName }: Props) => {
  return (
    <Link href={path} className="relative">
      <Image
        src={imageUrl}
        layout="responsive"
        className="aspect-square w-full rounded-2xl"
        alt={chefName}
        width={160}
        height={160}
      />
      <p className="absolute bottom-3 left-3 mr-3 line-clamp-2 rounded-md bg-[#040013]/[.48] px-1 text-xl font-semibold text-mauve1">
        {chefName}
      </p>
    </Link>
  );
};
