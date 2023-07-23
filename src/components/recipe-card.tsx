import Image from "next/image";
import Link from "next/link";

import { Heart } from "lucide-react";

type Props = {
  path: string;
  imageUrl: string;
  title: string;
  description: string;
  favorites: number;
};

/**
 * レシピカード
 * お気に入りがある場合は右上にハートアイコンとお気に入り数を表示
 * このカードを押下時にレシピ詳細ページへ飛ぶ等になる。URLは「https://{domain}/recipe/{recipeId}」という形。
 * @returns
 */
const RecipeCard = ({ path, imageUrl, title, description, favorites }: Props) => {
  return (
    <Link href={path} className="relative">
      <Image src={imageUrl} layout="responsive" className="w-full rounded-2xl" alt={title} width={160} height={160} />
      {favorites > 0 && (
        <div className="absolute right-2 top-2 rounded-2xl bg-[#040013]/[.48] p-2 leading-none text-mauve1">
          <div className="flex items-center gap-2">
            <Heart size={16} />
            <span className="">{favorites}</span>
          </div>
        </div>
      )}
      <p className="mt-2 line-clamp-2 font-bold text-mauve12">{title}</p>
      <p className="mt-1 line-clamp-1 text-xs">{description}</p>
    </Link>
  );
};

export default RecipeCard;
