"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Image from "next/image";

import { createRecipe } from "@/src/actions/createRecipe";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Spinner from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import { Database } from "@/src/types/SupabaseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PlusIcon, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

import { formSchema } from ".";

type NewRecipeFormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<NewRecipeFormValues> = {
  title: "",
  recipeImage: "",
  bio: "",
  ingredients: [{ name: "" }],
  instructions: [{ value: "" }],
  urls: [{ value: "" }],
  servingCount: 1,
};

const NewRecipeForm = () => {
  const supabase = createClientComponentClient<Database>();
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<NewRecipeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    fields: urlsFields,
    append: appendUrls,
    remove: removeUrls,
  } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const {
    fields: ingredientsFields,
    append: appendIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const {
    fields: instructionsFields,
    append: appendInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    name: "instructions",
    control: form.control,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (image) {
      // supabaseストレージに画像アップロード
      const { data: storageData, error: storageError } = await supabase.storage
        .from("recipe")
        .upload(`${uuidv4()}`, image);

      // エラーチェック
      if (storageError) {
        console.log("エラーが発生しました。" + storageError.message);
        return;
      }

      // 画像のURLを取得
      const { data: urlData } = supabase.storage.from("recipe").getPublicUrl(storageData.path);

      data.recipeImage = urlData.publicUrl;
    }

    startTransition(async () => {
      await createRecipe(data);
      form.reset();
    });
  };

  // 画像アップロード
  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    console.log("");

    // ファイルが選択されていない場合
    if (!file || file?.length == 0) {
      console.log("画像をアップロードしてください。");
      return;
    }

    const fileSize = file[0]?.size / 1024 / 1024; // size in MB
    const fileType = file[0]?.type; // MIME type of the file

    // 画像サイズが2MBを超える場合
    if (fileSize > 2) {
      console.log("画像サイズを2MB以下にする必要があります。");
      return;
    }

    // ファイル形式がjpgまたはpngでない場合
    if (fileType !== "image/jpeg" && fileType !== "image/png") {
      console.log("画像はjpgまたはpng形式である必要があります。");
      return;
    }

    // 画像をセット
    setImage(file[0]);
    // 画像のプレビューをセット
    setPreviewImage(URL.createObjectURL(file[0]));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-8 pt-2">
        {/* レシピ名 */}
        <div className="w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-screen-sm">
                <FormLabel>レシピ名</FormLabel>
                <FormControl>
                  <Input placeholder="例：肉じゃが" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* レシピ画像 */}
        <div className="w-full">
          <FormItem className="grid w-full max-w-screen-sm">
            <FormLabel>レシピ画像</FormLabel>
            <FormControl>
              <>
                {!previewImage ? (
                  <Input type="file" accept=".png, .jpg, .jpeg" onChange={onUploadImage} />
                ) : (
                  <div className="relative mt-2 h-24 w-24">
                    <Image src={previewImage} alt="preview" layout="fill" objectFit="cover" />
                    <button
                      className="absolute right-0 top-0 rounded-full bg-white/80 shadow-md"
                      onClick={() => setPreviewImage(null)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </>
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

        {/* 何人前 */}
        <div className="w-fit self-start">
          <FormField
            control={form.control}
            name="servingCount"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-screen-sm">
                <FormLabel>何人前</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="例：4"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* 材料 */}
        <div className="flex w-full flex-col justify-items-start">
          {ingredientsFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>材料</FormLabel>
                  <FormControl className="flex gap-2">
                    <div className="relative flex-1">
                      <Input {...field} placeholder="例：じゃがいも" />
                      <button
                        type="button"
                        disabled={ingredientsFields.length === 1}
                        onClick={() => removeIngredients(index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-fit"
            onClick={() => appendIngredients({ name: "" })}
          >
            <PlusIcon size={16} />
          </Button>
        </div>
        {/* 作り方 */}
        <div className="flex w-full flex-col justify-items-start">
          {instructionsFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`instructions.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>作り方</FormLabel>
                  <FormControl className="flex gap-2">
                    <div className="relative flex-1 items-center">
                      <Label>{index + 1}</Label>
                      <Input {...field} placeholder="例：じゃがいもを切る" />
                      <button
                        type="button"
                        disabled={instructionsFields.length === 1}
                        onClick={() => removeInstructions(index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-fit"
            onClick={() => appendInstructions({ value: "" })}
          >
            <PlusIcon size={16} />
          </Button>
        </div>
        {/* 紹介文 */}
        <div className="w-full">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="grid w-full max-w-screen-sm">
                <FormLabel>レシピの紹介文（任意）</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* リンク */}
        <div className="flex w-full flex-1 flex-col justify-items-start">
          {urlsFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>リンク（任意）</FormLabel>
                  <FormControl>
                    <div className="relative flex-1">
                      <Input {...field} placeholder="例：https://cookpad.com/recipe/1234567" />
                      <button
                        type="button"
                        disabled={urlsFields.length === 1}
                        onClick={() => removeUrls(index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 w-fit"
            onClick={() => appendUrls({ value: "" })}
          >
            <PlusIcon size={16} />
          </Button>
        </div>
        <Button type="submit" className="self-end">
          {isPending ? (
            <div className="flex gap-1">
              <Spinner /> 追加中
            </div>
          ) : (
            "追加"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NewRecipeForm;
