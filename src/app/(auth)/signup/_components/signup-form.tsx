"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { postUser } from "@/src/actions/postUser";
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

import { signUpFormSchema, SignUpFormValues } from "./schema";

const SignUpForm = () => {
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();
  const [isPending, startTransition] = useTransition();
  const [isPendingLogout, startTransitionLogout] = useTransition();

  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(signUpFormSchema),
    mode: "onChange",
  });

  const handleSubmit = (formData: SignUpFormValues) => {
    startTransition(async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (data.session) {
          const id = data.session.user.id;
          const result = await postUser({ id, name: formData.name });

          if (result.isSuccess) {
            toast({
              variant: "default",
              title: result.message,
              duration: kToastDuration,
            });
          } else {
            toast({
              variant: "destructive",
              title: result.error,
              duration: kToastDuration,
            });
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "予期しないエラーが発生しました🥲",
          duration: kToastDuration,
        });
      } finally {
        router.refresh();
      }
    });
  };

  const handleSignOut = async () => {
    startTransitionLogout(async () => {
      try {
        await supabase.auth.signOut();
        router.push("/");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "エラーが発生しました🥲",
          duration: kToastDuration,
        });
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mb-8 grid gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid space-y-0">
                <FormLabel className="mb-1 ml-3 mt-5 text-lg font-bold">ニックネーム</FormLabel>
                <FormControl>
                  <Input
                    className="w-full rounded-none border-x-0 px-4"
                    placeholder="ニックネームをご入力ください"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="ml-3" />
              </FormItem>
            )}
          />
          <div className="flex gap-4 px-4">
            <Button variant={"destructive"} className="flex-1 gap-2" type="submit">
              {isPending && <Spinner />} 新規登録
            </Button>
            <Button variant={"outlineDestructive"} className="flex-1 gap-2" type="submit" onClick={handleSignOut}>
              {isPendingLogout && <Spinner />} ログアウト
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
