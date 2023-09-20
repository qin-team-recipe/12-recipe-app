"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Heart } from "lucide-react";

type Props = {
  path: string;
  title: string;
  description: string;
  favorites: number;
  isPublished: boolean;
  imageComponent?: React.ReactNode;
};

const RecipeCard = ({ path, title, description, favorites, isPublished, imageComponent }: Props) => {
  const pathName = usePathname();

  const handleClick = () => {
    if (pathName.includes("chef")) return;

    sessionStorage.setItem("previousPath", pathName);
  };

  return (
    <Link href={path} className="relative" onClick={handleClick}>
      {imageComponent}
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
