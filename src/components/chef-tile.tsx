import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  imageUrl: string;
  chefName: string;
  bio: string | null;
  recipeCount: number;
};

export const ChefTile = ({ id, imageUrl, chefName, bio, recipeCount }: Props) => {
  return (
    <Link href={`/chef/${id}`}>
      <div className="flex gap-x-4">
        <Image
          sizes="100vw"
          className="flex-none overflow-hidden rounded-2xl object-cover"
          src={imageUrl}
          alt={chefName}
          width={80}
          height={128}
        />
        <div className="flex flex-col items-start self-center">
          <p className="line-clamp-1 text-xl font-bold text-mauve12">{chefName}</p>
          <p className="mt-2 line-clamp-3 text-mauve11">{bio}</p>
          <div className="mt-1 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <span className="text-mauve11">{recipeCount} レシピ</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
