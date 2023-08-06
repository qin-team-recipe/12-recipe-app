"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { putRecipe } from "@/src/actions/putRecipe";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import Spinner from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { daysInWeek } from "date-fns/constants/index";
import { ChevronDown, ChevronUp, Minus, MoreVertical, Plus, PlusIcon, Trash, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { editRecipeFormSchema, EditRecipeFormValues } from ".";

type Props = {
  defaultValues: Partial<EditRecipeFormValues>;
};

const EditRecipeForm = ({ defaultValues }: Props) => {
  const [imageData, setImageData] = useState(defaultValues.recipeImage ?? "");

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

  const changed = JSON.stringify(cleanedWatchedValues) !== JSON.stringify(defaultValues);

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

  const onSubmit = (data: z.infer<typeof editRecipeFormSchema>) => {
    startTransition(async () => {
      const result = await putRecipe(data);

      if (result.isSuccess) {
        toast({
          variant: "default",
          title: result.message,
          duration: 3000,
        });

        router.push(`/my-recipe/${defaultValues.recipeId}`);
      } else {
        toast({
          variant: "destructive",
          title: result.error,
          duration: 3000,
        });
      }
    });
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
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className={cn("mb-1 ml-3 flex items-center gap-3", index !== 0 && "sr-only")}>
                      <span className="text-lg font-bold">作り方</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex-1">
                        <div className="absolute left-4 top-1/2 mt-px flex h-5 w-5 shrink-0 -translate-y-1/2 select-none items-center justify-center rounded-full bg-tomato9 text-sm text-mauve1">
                          {stepOrder}
                        </div>
                        <Input {...field} className="rounded-none border-x-0 px-12" />
                        <Popover>
                          <PopoverTrigger className="absolute right-6 top-1/2 -translate-y-1/2">
                            <MoreVertical size={16} />
                          </PopoverTrigger>
                          <PopoverContent align="end" className="p-2">
                            <Command className="w-full">
                              <CommandList>
                                {/* TODO: 編集する機能の実装 */}
                                {index !== 0 && (
                                  <CommandItem className="text-mauve11">
                                    <button
                                      className="flex"
                                      onClick={() => {
                                        const instructions = [...watchedValues.instructions];
                                        const target = instructions[index];

                                        // orderの更新
                                        instructions[index].order = stepOrder - 1;
                                        instructions[index - 1].order = stepOrder;

                                        instructions[index] = instructions[index - 1];
                                        instructions[index - 1] = target;

                                        form.setValue("instructions", instructions);
                                      }}
                                    >
                                      <ChevronUp className="mr-2 h-4 w-4" />
                                      <span>上に移動する</span>
                                    </button>
                                  </CommandItem>
                                )}
                                {index !== instructionsFields.length - 1 && (
                                  <CommandItem className="text-mauve11">
                                    <button
                                      className="flex"
                                      onClick={() => {
                                        const instructions = [...watchedValues.instructions];
                                        const target = instructions[index];

                                        // orderの更新
                                        instructions[index].order = stepOrder + 1;
                                        instructions[index + 1].order = stepOrder;

                                        instructions[index] = instructions[index + 1];
                                        instructions[index + 1] = target;

                                        form.setValue("instructions", instructions);
                                      }}
                                    >
                                      <ChevronDown className="mr-2 h-4 w-4" />
                                      <span>下に移動する</span>
                                    </button>
                                  </CommandItem>
                                )}
                                <CommandSeparator />
                                <CommandItem className="text-mauve11">
                                  <button
                                    disabled={instructionsFields.length === 1}
                                    className="flex"
                                    onClick={() => {
                                      removeInstructions(index);

                                      // 削除した要素のあとの要素のorderを更新する
                                      const instructions = [...watchedValues.instructions];
                                      instructions.splice(index, 1);
                                      instructions.forEach((instruction, index) => {
                                        instruction.order = index + 1;
                                      });
                                      form.setValue("instructions", instructions);
                                    }}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>リストから削除する</span>
                                  </button>
                                </CommandItem>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage className="ml-4 pt-1" />
                  </FormItem>
                )}
              />
            );
          })}
          <button
            type="button"
            className="ml-3 mt-2 flex w-fit gap-1 text-tomato9"
            onClick={() => {
              console.log(instructionsFields.length);

              appendInstructions({ value: "", order: instructionsFields.length + 1 });
            }}
          >
            <PlusIcon size={16} />
            <span>工程を追加する</span>
          </button>
        </div>
        {/* レシピ画像 */}
        <FormField
          // TODO: 画像のバリデーション実装
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="ml-4 grid w-full space-y-0">
              <FormLabel className="mb-1 text-lg font-bold">画像（任意）</FormLabel>
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
              <FormMessage className="ml-4 pt-1" />
            </FormItem>
          )}
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
          <Button variant={"destructive"} className="flex-1 gap-2" type="submit" disabled={!changed || isPending}>
            {isPending && <Spinner />} 保存する
          </Button>
          <Link
            href={`/my-recipe/${defaultValues.recipeId}`}
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