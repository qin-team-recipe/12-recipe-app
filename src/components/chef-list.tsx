import Link from "next/link";

type Props = {
  routingUrl: string;
  imageUrl: string;
  cockName: string;
  comment: string;
  recipeName: string;
};

// 注目シェフ用のカード
export const ChefList = ({ imageUrl, cockName, comment, recipeName, routingUrl }: Props) => {
  return (
    <div className=" mt-4 ">
      <Link className="flex" href={routingUrl}>
        <img className="h-32 w-24 rounded-3xl" src={imageUrl} alt="chef" />
        <div className="ml-4 mt-1">
          <h3 className="text-lg font-bold">{cockName}</h3>
          <p className="my-1 text-sm text-neutral-400">{comment}</p>
          <p className="font-light">{recipeName}</p>
        </div>
      </Link>
    </div>
  );
};
