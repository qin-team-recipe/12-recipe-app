import Link from "next/link";

type Props = {
  routingUrl: string;
  imageUrl: string;
  chefName: string;
};

export const FavChef = ({ routingUrl, imageUrl, chefName }: Props) => {
  return (
    <div className="relative">
      <Link href={routingUrl} className="inline-block rounded-full h-[68px] w-[68px] overflow-hidden">
        <img src={imageUrl} alt="Icon" className="object-cover w-full h-full" />
      </Link>
      <p className="text-[12px] text-black absolute left-[4px] bottom-[-12px]">{chefName}</p>
    </div>
  );
};
