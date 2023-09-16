"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { putRecipe } from "@/src/actions/putRecipe";
import { useUploadImage } from "@/src/hooks/useUploadImage";
import { cn, getPlainTextFromJSON } from "@/src/lib/utils";
import { Database } from "@/src/types/SupabaseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Minus, Plus, PlusIcon, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import InstructionMenu from "@/src/components/instruction-menu";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import Spinner from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";

import { editRecipeFormSchema, EditRecipeFormValues } from ".";

type Props = {
  defaultValues: Partial<EditRecipeFormValues>;
  navigateTo: string;
};

const EditRecipeForm = ({ defaultValues, navigateTo }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { selectedImage, previewImageURL, isChangedImage, selectImage, clearImage, previousImageURL } = useUploadImage(
    defaultValues.recipeImage ?? null
  );

  const { toast } = useToast();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<EditRecipeFormValues>({
    resolver: zodResolver(editRecipeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchedValues = form.watch();

  const cleanedWatchedValues = {
    ...watchedValues,
    urls: watchedValues.urls.filter((url) => url?.value !== ""),
    ingredients: watchedValues.ingredients.filter((ingredient) => ingredient?.name !== ""),
    instructions: watchedValues.instructions.filter((instruction) => instruction?.value !== ""),
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

  const supabase = createClientComponentClient<Database>();

  const uploadImage = async (image: File) => {
    const { data: storageData, error: storageError } = await supabase.storage.from("recipe").upload(uuidv4(), image);
    if (storageError) {
      throw storageError;
    }
    const { data: urlData } = supabase.storage.from("recipe").getPublicUrl(storageData.path);
    return urlData.publicUrl;
  };

  const updateImage = async (path: string, image: File) => {
    const { error: replaceError } = await supabase.storage.from("recipe").update(path, image);
    if (replaceError) {
      throw replaceError;
    }
  };

  const removeImage = async (url: string) => {
    const path = url.split("/").slice(-1)[0];
    const { error: removeError } = await supabase.storage.from("recipe").remove([path]);
    if (removeError) {
      throw removeError;
    }
  };

  const onSubmit = (formData: z.infer<typeof editRecipeFormSchema>) => {
    setIsSubmitting(true);

    startTransition(async () => {
      try {
        if (selectedImage) {
          if (formData.recipeImage) {
            await updateImage(formData.recipeImage.split("/").slice(-1)[0], selectedImage);
          } else {
            formData.recipeImage = await uploadImage(selectedImage);
          }
        }

        if (previousImageURL) {
          await removeImage(previousImageURL);
        }

        const result = await putRecipe(formData);

        if (result.isSuccess) {
          toast({
            variant: "default",
            title: result.message,
            duration: 3000,
          });

          router.push(navigateTo);
        } else {
          toast({
            variant: "destructive",
            title: result.error,
            duration: 3000,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          form.setError("recipeImage", { type: "manual", message: error.message });
        }
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      selectImage(e.target.files);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        form.setError("recipeImage", { type: "manual", message: error.message });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 grid gap-8">
        {/* レシピ名 */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className=" grid w-full space-y-0">
              <FormLabel className="mb-1 ml-3 mt-5 text-lg font-bold">レシピ名</FormLabel>
              <FormControl>
                <Input className="w-full rounded-none border-x-0 px-4" placeholder="例：肉じゃが" {...field} />
              </FormControl>
              <FormMessage className="ml-4 pt-1" />
            </FormItem>
          )}
        />
        {/* 材料 */}
        <div>
          {ingredientsFields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={cn("mb-1 ml-3 flex items-center gap-3", index !== 0 && "sr-only")}>
                    <span className="mr-2 text-lg font-bold">材料 / {watchedValues.servingCount}人前</span>
                    <Minus
                      className="text-tomato11"
                      size={16}
                      onClick={() => form.setValue("servingCount", Math.max(watchedValues.servingCount - 1, 1))}
                    />
                    <PlusIcon
                      className="text-tomato11"
                      size={16}
                      onClick={() => form.setValue("servingCount", watchedValues.servingCount + 1)}
                    />
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex-1">
                      <Input {...field} className="rounded-none border-x-0 px-4" />
                      <Button
                        variant={"ghost"}
                        disabled={ingredientsFields.length === 1}
                        type="button"
                        onClick={() => removeIngredients(index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="ml-4 pt-1" />
                </FormItem>
              )}
            />
          ))}
          <button
            type="button"
            className="ml-3 mt-2 flex w-fit gap-1 text-tomato9"
            onClick={() => appendIngredients({ name: "" })}
          >
            <PlusIcon size={16} />
            <span>材料を追加する</span>
          </button>
        </div>
        {/* 作り方 */}
        <div>
          {instructionsFields.map((field, index) => {
            const stepOrder = index + 1;

            return (
              <FormField
                control={form.control}
                key={field.id}
                name={`instructions.${index}.value`}
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-0">
                      <FormLabel className={cn("mb-1 ml-3 flex items-center gap-3", index !== 0 && "sr-only")}>
                        <span className="text-lg font-bold">作り方</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative flex-1">
                          <div className="absolute left-4 top-1/2 mt-px flex h-5 w-5 shrink-0 -translate-y-1/2 select-none items-center justify-center rounded-full bg-tomato9 text-sm text-mauve1">
                            {stepOrder}
                          </div>
                          <p className="flex h-10 max-w-[800px] items-center self-center overflow-hidden whitespace-nowrap rounded-none border-x-0 border-y px-12">
                            <span className="inline-block max-w-full overflow-hidden">
                              {getPlainTextFromJSON(field.value)}
                            </span>
                          </p>
                          <InstructionMenu
                            {...{
                              index,
                              form,
                              instructionsFields,
                              removeInstructions,
                              stepOrder,
                              watchedValues,
                              fieldValue: JSON.parse(field.value),
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="ml-4 pt-1" />
                    </FormItem>
                  );
                }}
              />
            );
          })}
          <button
            type="button"
            className="ml-3 mt-2 flex w-fit gap-1 text-tomato9"
            onClick={() => {
              appendInstructions({ value: "", order: instructionsFields.length + 1 });
            }}
          >
            <PlusIcon size={16} />
            <span>工程を追加する</span>
          </button>
        </div>
        {/* レシピ画像 */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            const { onChange, value, ...restFieldProps } = field;

            return (
              <FormItem className="ml-4 grid w-full space-y-0">
                <FormLabel className="mb-1 text-lg font-bold">画像（任意）</FormLabel>
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
                          form.setValue("recipeImage", "");
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
                <FormMessage className="ml-4 pt-1" />
              </FormItem>
            );
          }}
        />
        {/* レシピの紹介文 */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className=" grid w-full space-y-0">
              <FormLabel className="mb-1 ml-3 text-lg font-bold">レシピの紹介文（任意）</FormLabel>
              <FormControl>
                <Textarea className="w-full rounded-none border-x-0" {...field} />
              </FormControl>
              <FormMessage className="ml-4 pt-1" />
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
                  <FormLabel className={cn("mb-1 ml-4 text-lg font-bold", index !== 0 && "sr-only")}>
                    リンク（任意）
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex-1">
                      <Input
                        {...field}
                        className="rounded-none border-x-0"
                        placeholder="例：https://cookpad.com/recipe/1234567"
                      />
                      <Button
                        variant={"ghost"}
                        type="button"
                        onClick={() => removeUrls(index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="ml-4 pt-1" />
                </FormItem>
              )}
            />
          ))}
          <button
            type="button"
            className="ml-3 mt-2 flex w-fit gap-1 text-tomato9"
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
            disabled={isPending || (!isChangedFiled && !isChangedImage) || isSubmitting}
          >
            {isPending && <Spinner />} 保存する
          </Button>
          <Link
            href={navigateTo}
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

export default EditRecipeForm;
