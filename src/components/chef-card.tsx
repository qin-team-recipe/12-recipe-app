import Link from "next/link";

type Props = {
  routingUrl: string;
  imageUrl: string;
  imageText: string;
};

// 注目シェフ用のカード
export const ChefCard = ({ routingUrl, imageUrl, imageText }: Props) => {
  return (
    <div className="relative h-56 w-36">
      <Link href={routingUrl}>
        <img className="h-full w-full rounded-2xl" src={imageUrl} alt="chef" />
        <p className="absolute bottom-3 left-3 text-xl font-semibold text-slate-100">{imageText}</p>
      </Link>
    </div>
  );
};
