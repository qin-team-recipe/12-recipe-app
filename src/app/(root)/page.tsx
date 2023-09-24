import { Suspense } from "react";
import Link from "next/link";

import TopBar from "@/src/components/layout/top-bar";
import SearchInput from "@/src/components/search-input";
import Spinner from "@/src/components/ui/spinner";

import ChefTiles from "./_components/chef-tiles";
import HorizontalTopFavoriteRecipesInLast3DaysList from "./_components/horizontal-top-favorite-recipes-in-last-3days-list";
import HorizontalTopFollowChefsInLast3DaysList from "./_components/horizontal-top-follow-chefs-in-last-3days-list";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <>
      <TopBar centerComponent={<SearchInput />} />

      {/* 注目のシェフ */}
      <section className="pt-5">
        <h2 className="pl-4 font-serif text-xl font-bold text-mauve12">注目のシェフ</h2>
        <Suspense
          fallback={
            <div className="flex h-20 items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <HorizontalTopFollowChefsInLast3DaysList />
        </Suspense>
      </section>

      {/* 話題のレシピ */}
      <section className="pt-12">
        <div className="flex items-center justify-between px-4">
          <h2 className=" font-serif text-xl font-bold text-mauve12">話題のレシピ</h2>
          <Link href={"/search/recipes"}>
            <span className="text-lg font-bold text-mauve9">もっと見る</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <HorizontalTopFavoriteRecipesInLast3DaysList />
        </Suspense>
      </section>

      {/* シェフ */}
      <section className="w-full pt-12">
        <h2 className="pl-4 font-serif text-xl font-bold text-mauve12">シェフ</h2>
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <ChefTiles />
        </Suspense>
      </section>
    </>
  );
};

export default page;
