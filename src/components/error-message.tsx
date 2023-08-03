import Link from "next/link";

import { buttonVariants } from "@/src/components/ui/button";

type Props = {
  errorCode: string;
  message: string;
};

const ErrorMessage: React.FC<Props> = ({ errorCode, message }) => (
  <div className="flex flex-col items-center gap-4 md:items-start">
    <h1 className="text-4xl font-bold">{errorCode}</h1>
    <h2 className="text-xl font-bold">{message}</h2>
    <Link href="/" className="mt-4 self-center md:self-end">
      <div
        className={buttonVariants({
          variant: "ghost",
        })}
      >
        <span className="font-bold">トップページに戻る</span>
      </div>
    </Link>
  </div>
);

export default ErrorMessage;
