import React from "react";

import { Button } from "./ui/button";

type Props = {
  isFavorite: boolean; // レシピまたはシェフをフォローしているかしていないかの判定
  activeLabel: string; // フォローしている際のボタン名
  inactiveLabel: string; // フォローしてない時のボタン名
  // handleClick: () => void; // フォローやお気に入りをする/外すのクリックイベントを渡す(一旦コメントアウト)
};

const ToggleButton = ({ isFavorite, activeLabel, inactiveLabel }: Props) => {
  return (
    <>
      <Button
        variant={isFavorite ? "destructive" : "outline"}
        className={
          isFavorite
            ? "bg-accent w-fit"
            : "text-accent bg-white border-accent w-fit hover:bg-inherit hover:text-accent hover:shadow"
        }
      >
        {isFavorite ? activeLabel : inactiveLabel}
      </Button>
    </>
  );
};

export default ToggleButton;
