"use client";

import { useCallback, useTransition } from "react";
import Image from "next/image";

import { postRecipe } from "@/src/actions/postRecipe";
import { createRecipeFormSchema } from "@/src/components/create-recipe-form";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Spinner from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { useUploadImage } from "@/src/hooks/useUploadImage";
import { cn } from "@/src/lib/utils";
import { Database } from "@/src/types/SupabaseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PlusIcon, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

type NewRecipeFormValues = z.infer<typeof createRecipeFormSchema>;

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
  const { image, previewImage, setPreviewImage, onUploadImage } = useUploadImage();
  const form = useForm<NewRecipeFormValues>({
    resolver: zodResolver(createRecipeFormSchema),
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

  const onSubmit = async (data: z.infer<typeof createRecipeFormSchema>) => {
    if (image) {
      // supabaseストレージに画像アップロード
      const { data: storageData, error: storageError } = await supabase.storage.from("recipe").upload(uuidv4(), image);
      // エラーチェック
      if (storageError) {
        form.setError("recipeImage", { type: "manual", message: storageError.message });
        return;
      }
      // 画像のURLを取得
      const { data: urlData } = supabase.storage.from("recipe").getPublicUrl(storageData.path);
      data.recipeImage = urlData.publicUrl;
    }

    startTransition(async () => {
      await postRecipe(data);
      form.reset();
    });
  };

  const handleChangeUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        onUploadImage(e);
      } catch (error) {
        if (error instanceof Error) {
          form.setError("recipeImage", { type: "manual", message: error.message });
        }
      }
    },
    [form, onUploadImage]
  );

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
          <FormField
            control={form.control}
            name="recipeImage"
            render={({ field }) => {
              const { onChange, ...restFieldProps } = field;
              return (
                <FormItem className="grid w-full max-w-screen-sm">
                  <FormLabel>レシピ画像</FormLabel>
                  <FormControl>
                    <>
                      {!previewImage ? (
                        <Input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          onChange={handleChangeUploadImage}
                          {...restFieldProps}
                        />
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
              );
            }}
          />
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
