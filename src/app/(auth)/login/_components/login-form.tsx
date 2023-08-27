"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { kToastDuration } from "@/src/constants/constants";
import type { Database } from "@/src/types/SupabaseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";

import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import Spinner from "@/src/components/ui/spinner";
import { useToast } from "@/src/components/ui/use-toast";

import { loginFormSchema, LoginFormValues } from "./schema";

type Props = {
  defaultValues: LoginFormValues;
};

const LoginForm = ({ defaultValues }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsSubmitting(true);

    startTransition(async () => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) {
          toast({
            variant: "destructive",
            title: error.message,
            duration: kToastDuration,
          });
          return;
        }

        router.push("/");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "エラーが発生しました。",
          duration: kToastDuration,
        });
        return;
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
          <Button variant={"destructive"} className="flex-1 gap-2" type="submit" disabled={isSubmitting}>
            {isPending && <Spinner />} ログイン
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        <Link href="/signup" className="font-bold text-gray-500">
          アカウントを作成する
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
