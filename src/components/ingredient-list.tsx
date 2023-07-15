"use client";

import { useCallback } from "react";

import { MoreVertical, ShoppingCart } from "lucide-react";

/**
 * @param name 材料名
 * @param addedCartFlg 買い物リストに追加済みか否かのフラグ
 * @param id 材料ID
 * @param isEdit 編集フラグ
 */

type Props = {
  name: string;
  addedCartFlg?: boolean; // 一旦据え置き。買い物リストに追加済みかどうかのフラグ
  id?: number; // 削除や上下に移動させる際に必要な材料ID
  isEdit?: boolean;
};

const IngredientList = ({ name, addedCartFlg, id, isEdit }: Props) => {
  const handleDelete = useCallback(() => {
    console.log("削除処理");
  }, []);
  return (
    <div className="flex justify-between gap-4 border-b-2 px-4 py-2">
      <p className="text-sm leading-6">{name}</p>
      {/* カートに追加・削除みたいなToggleの方がいい気がするけどFigma通りに実装 */}
      {/* 実際にカートに追加されたかがわからないため、カートに追加済みの場合は赤く、未追加の場合はデフォルトにする処理をする(Figmaにはない) */}
      {addedCartFlg !== undefined && <ShoppingCart color={addedCartFlg ? "red" : "grey"} size={20} />}
      {isEdit && <MoreVertical size={24} />}
    </div>
  );
};

export default IngredientList;
