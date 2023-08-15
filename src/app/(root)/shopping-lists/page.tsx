import Header from "@/src/app/(root)/shopping-lists/_components/header";
import TopBar from "@/src/components/layout/top-bar";
import { EditableChecklistItem } from "@/src/components/shopping-list";

const page = () => {
  return (
    <>
      <TopBar centerComponent={<div className="font-bold text-mauve12 md:text-xl">買い物リスト</div>} />
      {/* じぶんメモ用UIのみ */}
      <Header title="じぶんメモ" />
      <EditableChecklistItem text="ああ" />
      {/* レシピ用UIのみ */}
      <Header
        isRecipe
        title="長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ長いレシピ"
      />
      <EditableChecklistItem text="複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認複数行確認" />
    </>
  );
};

export default page;
