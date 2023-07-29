"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { postUser } from "@/src/actions/postUser";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";
import type { Database } from "@/src/types/SupabaseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";

import { signUpFormSchema, SignUpFormValues } from "./schema";

type Props = {
  defaultValues: SignUpFormValues;
};

// サインアップページ
const SignUpForm = ({ defaultValues }: Props) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignUpFormValues) => {
    startTransition(async () => {
      try {
        // サインアップ
        const { data: responseData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });

        // エラーチェック
        if (error) {
          setMessage("エラーが発生しました。" + error.message);
          toast({
            variant: "destructive",
            title: `エラーが発生しました。${error.message}`,
            duration: 3000,
          });
          return;
        }

        // プロフィールの名前を更新
        const result = await postUser({ id: responseData.user?.id, name: data.name });

        // エラーチェック
        if (result.isSuccess) {
          setMessage(
            "本登録用のURLを記載したメールを送信しました。メールをご確認の上、メール本文中のURLをクリックして、本登録を行ってください。"
          );
        } else {
          toast({
            variant: "destructive",
            title: "エラーが発生しました",
            duration: 3000,
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "エラーが発生しました",
          duration: 3000,
        });
      } finally {
        router.refresh();
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 grid gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid space-y-0">
                <FormLabel className="mb-1 ml-3 mt-5 text-lg font-bold">名前</FormLabel>
                <FormControl>
                  <Input className="w-full rounded-none border-x-0" {...field} />
                </FormControl>
                <FormMessage className="ml-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid space-y-0">
                <FormLabel className="mb-1 ml-3 mt-5 text-lg font-bold">メールアドレス</FormLabel>
                <FormControl>
                  <Input className="w-full rounded-none border-x-0" {...field} />
                </FormControl>
                <FormMessage className="ml-3" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid space-y-0">
                <FormLabel className="mb-1 ml-3 mt-5 text-lg font-bold">パスワード</FormLabel>
                <FormControl>
                  <Input className="w-full rounded-none border-x-0" {...field} />
                </FormControl>
                <FormMessage className="ml-3" />
              </FormItem>
            )}
          />
          <Button variant={"destructive"} className="flex-1 gap-2" type="submit">
            {isPending && <Spinner />} サインアップ
          </Button>
        </form>
      </Form>

      {message && <div className="my-5 text-center text-sm text-tomato9">{message}</div>}

      <div className="text-center text-sm">
        <Link href="/login" className="font-bold text-gray-500">
          ログインはこちら
        </Link>
      </div>
    </>
  );
};

export default SignUpForm;
