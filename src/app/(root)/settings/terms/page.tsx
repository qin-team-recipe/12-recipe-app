import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import TopBar from "@/src/components/layout/top-bar";

import TermsSection from "../_components/terms-section";

const termsList = [
  {
    title: "第一項",
    termsText: (
      <div className="mt-4 text-[14px]">
        <p className="mb-4">
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
        </p>
      </div>
    ),
  },
  {
    title: "第二項",
    termsText: (
      <div className="mt-4 text-[14px]">
        <p className="mb-4">
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
        </p>
        <p>
          吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。
        </p>
      </div>
    ),
  },
];

const page = () => {
  return (
    <>
      <TopBar
        leadingComponent={
          <div className="flex items-center gap-3">
            <Link href={"/settings"}>
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-bold text-mauve12 md:text-xl">利用規約</h1>
          </div>
        }
      />
      {termsList.map((terms, index) => (
        <TermsSection key={index} title={terms.title} termsText={terms.termsText} />
      ))}
    </>
  );
};

export default page;
