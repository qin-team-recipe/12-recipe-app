"use client";

import Image from "next/image";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IconBrandApple, IconBrandGoogle } from "@tabler/icons-react";

import { Button } from "@/src/components/ui/button";

import { kToastDuration } from "../constants/constants";
import { Database } from "../types/SupabaseTypes";
import { toast } from "./ui/use-toast";

const SuggestLogin = () => {
  const supabase = createClientComponentClient<Database>();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: `エラーが発生しました。${error.message}`,
        duration: kToastDuration,
      });
      return;
    }
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
