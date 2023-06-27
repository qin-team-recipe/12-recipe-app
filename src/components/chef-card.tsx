import Link from "next/link";

type Props = {
  routingUrl: string;
  imageUrl: string;
  imageText: string;
};

// 注目シェフ用のカード
export const ChefCard = ({ routingUrl, imageUrl, imageText }: Props) => {
  return (
    <div className="w-36 h-56 relative">
      <div>test</div>
      <Link href={routingUrl}>
        <img className="w-full h-full rounded-2xl" src={imageUrl} alt="chef" />
        <p className="text-xl text-slate-100 font-semibold absolute left-3 bottom-3">{imageText}</p>
      </Link>
    </div>
  );
};
