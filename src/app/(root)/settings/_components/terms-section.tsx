import { ReactNode } from "react";

type Props = {
  title: string;
  termsText: ReactNode;
};

const TermsSection = ({ title, termsText} : Props) => {
  return (
    <div className="px-6 py-4">
      <h2 className="mt-1 text-lg font-bold">{title}</h2>
      <div className="mt-4 text-[14px]">
        {termsText}
      </div>
    </div>
  );
};

export default TermsSection;
