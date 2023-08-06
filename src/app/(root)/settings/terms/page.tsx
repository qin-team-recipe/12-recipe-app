import Link from "next/link";
import TopBar from "@/src/components/layout/top-bar";
import { ArrowLeft } from "lucide-react";

const page = () => {
  return (
    <>
      <TopBar
        leadingComponent={
          <div className="flex items-center gap-3">
            <Link href={"/favorite"}>
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-bold text-mauve12 md:text-xl">利用規約</h1>
          </div>
        }
      />
      <section className="px-6 py-4">
        <h2 className="mt-1 text-lg font-bold">第一項</h2>
        <div className="mt-4 text-[14px]">
          <p className="mb-4">吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。</p>
        </div>
      </section>
      <section className="px-6 py-4">
        <h2 className="mt-1 text-lg font-bold">第二項</h2>
        <div className="mt-4 text-[14px]">
          <p className="mb-4">吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。</p>
          <p>吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。</p>
        </div>
      </section>
    </>
  );
};

export default page;
