"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { putChef } from "@/src/actions/putChef";
import { kToastDuration } from "@/src/constants/constants";
import { useUploadImage } from "@/src/hooks/useUploadImage";
import { cn } from "@/src/lib/utils";
import { Database } from "@/src/types/SupabaseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Minus, Plus, PlusIcon, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { Button, buttonVariants } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import Spinner from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";

import { editChefFormSchema, EditChefFormValues } from ".";

type Props = {
  defaultValues: Partial<EditChefFormValues>;
};

const EditChefForm = ({ defaultValues }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { selectedImage, previewImageURL, isChangedImage, selectImage, clearImage, previousImageURL } = useUploadImage(
    defaultValues.profileImage ?? null
  );

  const { toast } = useToast();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<EditChefFormValues>({
    resolver: zodResolver(editChefFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchedValues = form.watch();
  const cleanedWatchedValues = {
    ...watchedValues,
    urls: watchedValues.urls.filter((url) => url?.value !== ""),
  };

  const isChangedFiled = JSON.stringify(cleanedWatchedValues) !== JSON.stringify(defaultValues);

  const {
    fields: urlsFields,
    append: appendUrls,
    remove: removeUrls,
  } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const supabase = createClientComponentClient<Database>();

  const uploadImage = async (image: File) => {
    const { data: storageData, error: storageError } = await supabase.storage.from("chef").upload(uuidv4(), image);
    if (storageError) {
      throw storageError;
    }
    const { data: urlData } = supabase.storage.from("chef").getPublicUrl(storageData.path);
    return urlData.publicUrl;
  };

  const updateImage = async (path: string, image: File) => {
    const { error: replaceError } = await supabase.storage.from("chef").update(path, image);
    if (replaceError) {
      throw replaceError;
    }
  };

  const removeImage = async (url: string) => {
    const path = url.split("/").slice(-1)[0];
    const { error: removeError } = await supabase.storage.from("chef").remove([path]);
    if (removeError) {
      throw removeError;
    }
  };

  const onSubmit = (formData: z.infer<typeof editChefFormSchema>) => {
    setIsSubmitting(true);

    startTransition(async () => {
      try {
        if (selectedImage) {
          if (formData.profileImage) {
            await updateImage(formData.profileImage.split("/").slice(-1)[0], selectedImage);
          } else {
            formData.profileImage = await uploadImage(selectedImage);
          }
        }

        if (previousImageURL) {
          await removeImage(previousImageURL);
        }

        const result = await putChef(formData);

        if (result.isSuccess) {
          toast({
            variant: "default",
            title: "シェフのプロフィールを更新しました🎉",
            duration: kToastDuration,
          });
          router.push(`/admin`);
        } else {
          toast({
            variant: "destructive",
            title: "シェフのプロフィールの更新に失敗しました🥲",
            duration: kToastDuration,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          form.setError("profileImage", { type: "manual", message: error.message });
        }
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      selectImage(e.target.files);
    } catch (error) {
      if (error instanceof Error) {
        form.setError("profileImage", { type: "manual", message: error.message });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 grid gap-8">
        {/* シェフ名 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid space-y-0">
              <FormLabel className="mb-1 ml-3 mt-5 text-lg font-bold">シェフ名</FormLabel>
              <FormControl>
                <Input className="w-full rounded-none border-x-0" {...field} />
              </FormControl>
              <FormMessage className="ml-3" />
            </FormItem>
          )}
        />
        {/* プロフィール画像 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            const { onChange, value, ...restFieldProps } = field;

            return (
              <FormItem className=" ml-3 grid w-full space-y-0">
                <FormLabel className="mb-1 text-lg font-bold">プロフィール画像（任意）</FormLabel>
                <FormControl>
                  {previewImageURL ? (
                    <div className="relative h-[100px] w-[100px]">
                      <Image
                        width={100}
                        height={100}
                        className="h-[100px] w-[100px] rounded-xl border border-border object-cover"
                        src={previewImageURL}
                        alt="プロフィール写真"
                      />
                      <button
                        type="button"
                        className="absolute -right-2 -top-1 z-50"
                        onClick={() => {
                          clearImage();
                          form.setValue("profileImage", "");
                        }}
                      >
                        <Minus className="h-5 w-5 rounded-full bg-tomato9 p-1 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="file" className="h-[100px] w-[100px]">
                      <input
                        type="file"
                        id="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        {...restFieldProps}
                      />
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-border text-mauve11 hover:cursor-pointer">
                        <p className="text-xs">画像を設定</p>
                        <Plus className="w-5" />
                      </div>
                    </label>
                  )}
                </FormControl>
                <FormMessage className="ml-3" />
              </FormItem>
            );
          }}
        />
        {/* 自己紹介 */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className=" grid w-full space-y-0">
              <FormLabel className="mb-1 ml-3 text-lg font-bold">紹介文（任意）</FormLabel>
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
          <Button
            variant={"destructive"}
            className="flex-1 gap-2"
            type="submit"
            disabled={isPending || !isChangedFiled || !isChangedImage || isSubmitting}
          >
            {isPending && <Spinner />} 保存する
          </Button>
          <Link
            href="/admin"
            className={buttonVariants({
              variant: "outline",
              className: "w-full flex-1 border-tomato7 text-tomato11",
            })}
          >
            キャンセル
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default EditChefForm;
