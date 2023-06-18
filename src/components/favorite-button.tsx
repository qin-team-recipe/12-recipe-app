import React from "react";

import { Button } from "./ui/button";

type Props = {
  isFavorite: boolean; // レシピまたはシェフをフォローしているかしていないかの判定
  isFavoriteName: string; // フォローしている際のボタン名
  unFavoriteName: string; // フォローしてない時のボタン名
  // handleClick: () => void; // フォローやお気に入りをする/外すのクリックイベントを渡す(一旦コメントアウト)
};

const FavoriteButton = ({ isFavorite, isFavoriteName, unFavoriteName }: Props) => {
  return (
    <div>
      {isFavorite && <Button variant="destructive">{isFavoriteName}</Button>}
      {!isFavorite && (
        <Button
          className="text-red-400 border-red-400 hover:bg-inherit hover:text-red-400 hover:shadow"
          variant="outline"
        >
          {unFavoriteName}
        </Button>
      )}
    </div>
  );
};

export default FavoriteButton;
