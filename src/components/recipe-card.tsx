import Image from "next/image";
import Link from "next/link";

import { Heart } from "lucide-react";

import { getBlurDataURL } from "../lib/images";
import BlurImage from "./blur-image";

type Props = {
  path: string;
  imageUrl?: string;
  title: string;
  description: string;
  favorites: number;
  isPublished: boolean;
};

const RecipeCard = async ({ path, imageUrl, title, description, favorites, isPublished }: Props) => {
  return (
    <Link href={path} className="relative">
      <BlurImage
        src={imageUrl || "/images/recipe-placeholder.png"}
        className="h-auto w-full rounded-2xl object-cover"
        alt={title}
        width={160}
        height={160}
        placeholder="blur"
        priority
        blurDataURL={await getBlurDataURL(imageUrl || "/images/recipe-placeholder.png")}
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
