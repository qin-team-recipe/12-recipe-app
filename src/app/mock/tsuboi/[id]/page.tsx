import { Suspense } from "react";

import Spinner from "@/src/components/ui/spinner";

import InstructionList from "./_components/instruction-list";

const page = async ({ params }: { params: { id: string } }) => {
  // TODO: レシピ画像の取得

  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <InstructionList id={params.id} />
      </Suspense>
    </>
  );
};

export default page;
