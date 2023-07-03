import { deleteMemo } from "@/src/actions/deleteMemo";
import { getChefs } from "@/src/actions/getChefs";
import getMemos from "@/src/actions/getMemos";
import { Separator } from "@/src/components/ui/separator";

import DoneMemo from "../_components/done-memo";
import NewMemo from "../_components/new-memo";

const page = async () => {
  const chefs = await getChefs();
  console.log(chefs);

  const memos = await getMemos();
  console.log(memos);

  return (
    <div className="pt-4">
      <NewMemo />
      <Separator className="my-2" />
      <h2 className="pt-2 text-2xl font-extrabold">自分メモ</h2>
      <div>
        {memos?.map((memo) => (
          <li key={memo.id} className={`flex items-center space-x-2 ${memo.isCompleted ? "line-through" : ""}`}>
            <DoneMemo id={memo.id} isCompleted={memo.isCompleted} />
            {memo.title}
            <form>
              <input type="hidden" name="memoId" value={memo.id} />
              <button formAction={deleteMemo}>削除</button>
            </form>
          </li>
        ))}
      </div>
    </div>
  );
};

export default page;
