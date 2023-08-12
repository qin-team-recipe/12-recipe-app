import { getMemos } from "@/src/actions/getMemos";
import TopBar from "@/src/components/layout/top-bar";
import { LinkListItem } from "@/src/components/link-list";

import { MemoForm, MemoFormValues } from "./_components/memo-form";

const page = async () => {
  const memos = await getMemos();

  const defaultValues: Partial<MemoFormValues> = {
    memo: memos.map((memo) => {
      return {
        id: memo.id,
        text: memo.title,
        order: memo.order,
        isCompleted: memo.isCompleted,
      };
    }),
  };

  return (
    <>
      <TopBar centerComponent={<div className="font-bold text-mauve12 md:text-xl">買い物リスト</div>} />
      {/* 自分メモ */}
      <section className="mt-5">
        <MemoForm defaultValues={defaultValues} />
      </section>
      <LinkListItem />
    </>
  );
};

export default page;
