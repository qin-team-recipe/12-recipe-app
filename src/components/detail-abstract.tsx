import React from "react";

type Props = {
  name: string; // シェフ名orレシピ名
  abstract: string; // 概要
};

const DetailAbstract = ({ name, abstract }: Props) => {
  return (
    <div className="grid gap-4">
      <h6 className="font-bold text-xl">{name}</h6>
      <p>{abstract}</p>
    </div>
  );
};

export default DetailAbstract;
