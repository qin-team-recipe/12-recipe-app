import Image from "next/image";
import Link from "next/link";

import { Heart } from "lucide-react";

type Props = {
  path: string;
  imageUrl: string;
  title: string;
  description: string;
  favorites: number;
  isPublished: boolean;
};

const RecipeCard = ({ path, imageUrl, title, description, favorites, isPublished }: Props) => {
  const noImageFound = imageUrl === "";
  return (
    <Link href={path} className="relative">
      <Image
        src={
          noImageFound
            ? "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
            : imageUrl
        }
        sizes="100vw"
        className="h-auto w-full rounded-2xl object-cover"
        alt={title}
        width={160}
        height={160}
      />
      {favorites > 0 && (
        <div className="absolute right-2 top-2 rounded-2xl bg-[#040013]/[.48] p-2 leading-none text-mauve1">
          {isPublished ? (
            <div className="flex items-center gap-2">
              <Heart size={16} />
              <span>{favorites}</span>
            </div>
          ) : (
            <span>非公開</span>
          )}
        </div>
      )}
      <p className="mt-2 line-clamp-2 font-bold text-mauve12">{title}</p>
      <p className="mt-1 line-clamp-1 text-xs">{description}</p>
    </Link>
  );
};

export default RecipeCard;
