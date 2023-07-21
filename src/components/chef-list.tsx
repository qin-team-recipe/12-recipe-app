import Link from "next/link";

type Props = {
  routingUrl: string;
  imageUrl: string;
  chefName: string;
  comment: string;
  recipeName: string;
};

// 注目シェフ用のカード
export const ChefTitle = ({ imageUrl, chefName, comment, recipeName, routingUrl }: Props) => {
  return (
    <div className=" mt-4 ">
      <Link className="flex" href={routingUrl}>
        <img className="h-32 w-24 rounded-3xl" src={imageUrl} alt={`chef ${chefName}`} />
        <div className="ml-4 flex flex-col justify-center gap-1">
          <h3 className="text-lg font-bold">{chefName}</h3>
          <p className="line-clamp-3 text-sm text-mauve10">{comment}</p>
          <div className="flex gap-1">
            <svg className="" width="18" height="18" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.75H9L8.25 9.5H3.75L3 2.75Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.25 14H6.75V16.25H5.25V14Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M14.9999 2.75V11.75H11.2499C11.2327 8.98925 11.3879 6.1955 14.9999 2.75Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M15 11.75V16.25H14.25V14" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 9.5V14" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="ml-1 text-sm font-normal">{recipeName}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
