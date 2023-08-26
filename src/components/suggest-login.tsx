"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { IconBrandApple, IconBrandGoogle } from "@tabler/icons-react";

import { Button } from "@/src/components/ui/button";

const SuggestLogin = () => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <div className="mx-auto mb-5">
        <Image
          width={200}
          height={200}
          src="https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/61bf07d2cce98fb122df3dd3_1.png"
          alt="login"
        />
      </div>
      <p className="mb-3 font-bold text-mauve12">ログインをお願いします</p>
      <p className="mb-3 text-sm text-mauve12">こちらの機能を利用するにはログインが必要です</p>
      <div className="flex gap-3">
        <Button className="gap-1 bg-slateBlue10 hover:bg-slateBlue10" onClick={handleClick}>
          <IconBrandGoogle size={16} stroke={3} />
          Googleログイン
        </Button>
        <Button className="gap-1" onClick={handleClick}>
          <IconBrandApple size={16} stroke={3} />
          Appleログイン
        </Button>
      </div>
    </div>
  );
};

export default SuggestLogin;
