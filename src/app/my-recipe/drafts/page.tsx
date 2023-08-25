import Link from "next/link";

import { getDraftRecipes } from "@/src/actions/getDraftRecipes";
import { ArrowLeft } from "lucide-react";

import TopBar from "@/src/components/layout/top-bar";
import NoDataDisplay from "@/src/components/no-data-display";

import DraftRecipeTile from "./_components/draft-recipe-tile";

const page = async () => {
  const draftRecipes = await getDraftRecipes();

  return (
    <>
      <TopBar
        leadingComponent={
          <div className="flex items-center gap-3">
            <Link href={"/my-recipe/create"}>
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-bold text-mauve11 md:text-xl">下書き</h1>
          </div>
        }
      />
      {draftRecipes.length > 0 ? (
        <ul>
          {draftRecipes.map(({ title, id, createdAt }) => (
            <li key={id} className="flex cursor-pointer justify-between border-b px-4 py-2">
              <DraftRecipeTile {...{ title, id, createdAt }} />
            </li>
          ))}
        </ul>
      ) : (
        <NoDataDisplay text="下書きのレシピはありません。" />
      )}
    </>
  );
};

export default page;
