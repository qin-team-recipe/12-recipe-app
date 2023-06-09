import Link from "next/link";

type Props = {
  routingUrl: string;
  imageUrl: string;
  imageText: string;
};

// 注目シェフ用のカード
export const ChefCard = (props: Props) => {
  const { routingUrl, imageUrl, imageText } = props;
  return (
    <div className="w-36 h-56 relative">
      <Link href={routingUrl}>
        <img className="w-full h-full" src={imageUrl} alt="chef" />
        <p className="text-xl text-slate-100 font-semibold absolute left-3 bottom-3">{imageText}</p>
      </Link>
    </div>
  );
};
