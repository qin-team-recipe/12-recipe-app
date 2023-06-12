import React from "react";
import Link from "next/link";

import { Heart } from "lucide-react";

import { PATH_ITEMS } from "../constants/path-items";

type Props = {
  imageUrl: string;
  recipeName: string;
  comment: string;
  recipeId: number;
  favorites: number | null;
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
          <img className="rounded-2xl aspect-square" src={imageUrl} alt="recipe-card" />
          {favorites && (
            <div className="flex absolute h-7 rounded-2xl bg-slate-600 bg-opacity-50 items-center p-1 top-2 right-2">
              <Heart className="text-white mr-1" size={14} />
              <label className="text-white text-sm" htmlFor="favorite">
                {favorites}
              </label>
            </div>
          )}
        </div>
        <div className="grid">
          <h6 className="text-xs font-bold mt-1 text-ellipsis line-clamp-2">{recipeName}</h6>
          <p className="text-extend-ss mt-1 text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap">{comment}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
