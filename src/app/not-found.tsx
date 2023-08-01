import type { Metadata } from "next";

import ErrorMessage from "@/src/components/error-message";

export const metadata: Metadata = {
  title: "404 Not Found",
};

const notFound = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 text-mauve12">
      <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:text-left">
        <img
          alt="404 “This is not the web page you are looking for”"
          src="https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/61bf07d2cce98fb122df3dd3_1.png"
          className="h-60 w-60"
        />
        <ErrorMessage errorCode="404" message="お探しのページは見つかりませんでした" />
      </div>
    </section>
  );
};

export default notFound;
