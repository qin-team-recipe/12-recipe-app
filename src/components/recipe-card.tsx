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
    <>
      <Link href={path}>
        <div className="relative">
          <img className="aspect-square rounded-2xl" src={imageUrl} alt="recipe-card" />
          {favorites > 0 && (
            <div className="absolute right-2 top-2 flex h-7 items-center rounded-2xl bg-[#040013]/[.5] p-1">
              <Heart className="mr-1 text-mauve1" size={16} />
              <label className="text-sm text-mauve1" htmlFor="favorite">
                {favorites}
              </label>
            </div>
          )}
        </div>
        <div className="grid">
          <h6 className="mt-1 line-clamp-2 text-ellipsis text-xs font-bold text-mauve12">{title}</h6>
          <p className="mt-1 truncate text-extend-ss text-mauve11">{description}</p>
        </div>
      </Link>
    </>
  );
};

export default RecipeCard;
