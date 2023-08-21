"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { putProfile } from "@/src/actions/putProfile";
import { kToastDuration } from "@/src/constants/constants";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, PlusIcon, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import Spinner from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";

import { EditFormValues, editProfileFormSchema } from ".";

type Props = {
  defaultValues: Partial<EditFormValues>;
};

const EditProfileForm = ({ defaultValues }: Props) => {
  const [imageData, setImageData] = useState("");

  const { toast } = useToast();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchedValues = form.watch();
  const cleanedWatchedValues = {
    ...watchedValues,
    urls: watchedValues.urls.filter((url) => url?.value !== ""),
  };

  const changed = JSON.stringify(cleanedWatchedValues) !== JSON.stringify(defaultValues);

  const {
    fields: urlsFields,
    append: appendUrls,
    remove: removeUrls,
  } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const onSubmit = (data: z.infer<typeof editProfileFormSchema>) => {
    startTransition(async () => {
      const result = await putProfile(data);

      if (result.isSuccess) {
        toast({
          variant: "default",
          title: result.message,
          duration: kToastDuration,
        });
        router.push(`/my-page`);
      } else {
        toast({
          variant: "destructive",
          title: result.error,
          duration: kToastDuration,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 grid gap-8">
        {/* ニックネーム */}
        <FormField
          control={form.control}
          name="nickName"
          render={({ field }) => (
            <FormItem className="grid space-y-0">
              <FormLabel className="mb-1 ml-3 mt-5 text-lg font-bold">ニックネーム</FormLabel>
              <FormControl>
                <Input className="w-full rounded-none border-x-0" {...field} />
              </FormControl>
              <FormMessage className="ml-3" />
            </FormItem>
          )}
        />
        {/* プロフィール画像 */}
        <FormField
          // TODO: 画像のバリデーション実装
          control={form.control}
          name="nickName"
          render={({ field }) => (
            <FormItem className=" ml-3 grid w-full space-y-0">
              <FormLabel className="mb-1 text-lg font-bold">プロフィール画像（任意）</FormLabel>
              <FormControl>
                {imageData ? (
                  <div className="relative">
                    <button className="absolute" onClick={() => setImageData("")}>
                      <Minus
                        className="absolute -top-2 left-[86px] z-50 h-5 w-5 rounded-full bg-primary p-1 text-white"
                        onClick={() => setImageData("")}
                      />
                    </button>
                    <Image
                      width={100}
                      height={100}
                      className="h-[100px] w-[100px] rounded-xl border border-border object-cover"
                      src={imageData}
                      alt="image"
                    />
                  </div>
                ) : (
                  <label htmlFor="file">
                    <input type="file" id="file" className="hidden" accept="image/*" {...form} />
                    <div className="flex h-[100px] w-[100px] flex-col items-center justify-center gap-2 rounded-xl border border-border text-mauve11 hover:cursor-pointer">
                      <p className="text-xs">画像を設定</p>
                      <Plus className="w-5" />
                    </div>
                  </label>
                )}
              </FormControl>
              <FormMessage className="ml-3" />
            </FormItem>
          )}
        />
        {/* 自己紹介 */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className=" grid w-full space-y-0">
              <FormLabel className="mb-1 ml-3 text-lg font-bold">自己紹介（任意）</FormLabel>
              <FormControl>
                <Textarea className="rounded-none border-x-0" {...field} />
              </FormControl>
              <FormMessage className="ml-3" />
            </FormItem>
          )}
        />
        {/* リンク */}
        <div>
          {urlsFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={cn("mb-1 ml-3 text-lg font-bold", index !== 0 && "sr-only")}>
                    リンク（任意）
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex-1">
                      <Input
                        {...field}
                        className="rounded-none border-x-0"
                        placeholder="例：https://cookpad.com/recipe/1234567"
                      />
                      <button
                        type="button"
                        onClick={() => removeUrls(index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="ml-3" />
                </FormItem>
              )}
            />
          ))}
          <button
            type="button"
            className="ml-3 mt-2 flex w-fit items-center gap-1 text-tomato9"
            onClick={() => appendUrls({ value: "" })}
          >
            <PlusIcon size={16} />
            <span>リンクを追加する</span>
          </button>
        </div>

        <div className="flex gap-2 px-4">
          <Button variant={"destructive"} className="flex-1 gap-2" type="submit" disabled={!changed || isPending}>
            {isPending && <Spinner />} 保存する
          </Button>
          <Link
            href="/my-page"
            className={buttonVariants({
              variant: "outline",
              className: "flex-1 border-tomato7 text-tomato11",
            })}
          >
            キャンセル
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
