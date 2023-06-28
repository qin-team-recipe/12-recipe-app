import React from "react";
import Link from "next/link";

import { Heart } from "lucide-react";

import { PATH_ITEMS } from "../constants/path-items";

type Props = {
  imageUrl: string;
  recipeName: string;
  comment: string;
  recipeId: number;
  favorites: number;
};

/**
 * レシピカード
 * お気に入りがある場合は右上にハートアイコンとお気に入り数を表示
 * このカードを押下時にレシピ詳細ページへ飛ぶ等になる。URLは「https://{domain}/recipe/{recipeId}」という形。
 * @returns
 */
const RecipeCard: React.FC<Props> = ({ imageUrl, recipeName, comment, recipeId, favorites }) => {
  return (
    <div>
      <Link href={`${PATH_ITEMS.RECIPE.PATH}/${recipeId}`}>
        <div className="relative">
          <img className="aspect-square rounded-2xl" src={imageUrl} alt="recipe-card" />
          {favorites > 0 && (
            <div className="absolute right-2 top-2 flex h-7 items-center rounded-2xl bg-mauve10 bg-opacity-50 p-1">
              <Heart className="mr-1 text-mauve1" size={14} />
              <label className="text-sm text-mauve1" htmlFor="favorite">
                {favorites}
              </label>
            </div>
          )}
        </div>
        <div className="grid">
          <h6 className="mt-1 line-clamp-2 text-ellipsis text-xs font-bold text-mauve12">{recipeName}</h6>
          <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-extend-ss text-mauve11">{comment}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
