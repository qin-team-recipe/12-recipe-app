"use client";

import { useTransition } from "react";
import Image from "next/image";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IconBrandGithub } from "@tabler/icons-react";

import { Button } from "@/src/components/ui/button";

import { kToastDuration } from "../constants/constants";
import { Database } from "../types/SupabaseTypes";
import Spinner from "./ui/spinner";
import { toast } from "./ui/use-toast";

type Props = {
  src: `/images/login${string}.png`;
};

const SuggestLogin = ({ src }: Props) => {
  const [isPending, startTransition] = useTransition();

  const supabase = createClientComponentClient<Database>();

  const handleClick = async () => {
    startTransition(async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "予期せぬエラーが発生しました🥲",
          duration: kToastDuration,
        });
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <div className="mx-auto mb-5">
        <Image width={200} height={200} src={src} alt="ログイン画面のイメージ" />
      </div>
      <p className="mb-3 font-bold text-mauve12">ログインをお願いします</p>
      <p className="mb-3 text-sm text-mauve12">こちらの機能を利用するにはログインが必要です</p>
      <div className="flex gap-3">
        <Button className="gap-1 bg-mauve12 hover:bg-mauve11" onClick={handleClick}>
          {isPending ? <Spinner /> : <IconBrandGithub size={16} stroke={3} />}
          GitHubログイン
        </Button>
        {/* <Button className="gap-1 bg-slateBlue10 hover:bg-slateBlue10" onClick={handleClick}>
          <IconBrandGoogle size={16} stroke={3} />
          Googleログイン
        </Button>
        <Button className="gap-1" onClick={handleClick}>
          <IconBrandApple size={16} stroke={3} />
          Appleログイン
        </Button> */}
      </div>
    </div>
  );
};

export default SuggestLogin;
