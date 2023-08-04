"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { postRecipe } from "@/src/actions/postRecipe";
import { recipeFormStateAtom } from "@/src/atoms/draftRecipeFormValuesAtom";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import Spinner from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { kToastDuration } from "@/src/constants/constants";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { ChevronDown, ChevronUp, Minus, MoreVertical, Plus, PlusIcon, Trash, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import useDeepCompareEffect from "use-deep-compare-effect";
import { z } from "zod";

import { createRecipeFormSchema, CreateRecipeFormValues } from ".";

type Props = {
  defaultValues: Partial<CreateRecipeFormValues>;
  redirectPath: string;
};

const CreateRecipeForm = ({ defaultValues, redirectPath }: Props) => {
  const [imageData, setImageData] = useState("");

  const pathname = usePathname();

  const { toast } = useToast();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateRecipeFormValues>({
    resolver: zodResolver(createRecipeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [_, setDraftRecipeFormValues] = useAtom(recipeFormStateAtom);

  const { setValue, watch, handleSubmit } = form;

  const watchedValues = watch();

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

  const onSubmit = (data: z.infer<typeof createRecipeFormSchema>) => {
    startTransition(async () => {
      const result = await postRecipe(data);

      if (result.isSuccess) {
        toast({
          variant: "default",
          title: result.message,
          duration: kToastDuration,
        });
        router.push(redirectPath);
      } else {
        toast({
          variant: "destructive",
          title: result.error,
          duration: kToastDuration,
        });
      }
    });
  };

  useDeepCompareEffect(() => {
    if (pathname !== "/my-recipe/create") {
      return;
    }

    const isAnyFieldFilled = Object.entries(watchedValues).some(([key, value]) => {
      if (Array.isArray(value)) {
        return value.some((item) => {
          if (typeof item === "object" && item !== null) {
            return Object.values(item).some(
              (field) =>
                field !== undefined &&
                field !== "" &&
                (!defaultValues[key as keyof CreateRecipeFormValues] ||
                  field !== defaultValues[key as keyof CreateRecipeFormValues])
            );
          }
          return false;
        });
      } else {
        return (
          value !== undefined &&
          value !== "" &&
          (!defaultValues[key as keyof CreateRecipeFormValues] ||
            value !== defaultValues[key as keyof CreateRecipeFormValues])
        );
      }
    });

    setDraftRecipeFormValues({
      isDraft: isAnyFieldFilled,
      draftRecipeFormValues: watchedValues,
    });
  }, [defaultValues, setDraftRecipeFormValues, watchedValues]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 grid gap-8">
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
                      onClick={() => setValue("servingCount", Math.max(watchedValues.servingCount - 1, 1))}
                    />
                    <PlusIcon
                      className="text-tomato11"
                      size={16}
                      onClick={() => setValue("servingCount", watchedValues.servingCount + 1)}
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
                        <div className="absolute left-4 top-1/2 mt-px  flex h-5 w-5 shrink-0 -translate-y-1/2 select-none items-center justify-center rounded-full bg-tomato9 text-sm text-mauve1">
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
            onClick={() => appendInstructions({ value: "" })}
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

        <div className="flex px-4">
          <Button variant={"destructive"} className="flex-1 gap-2" type="submit">
            {isPending && <Spinner />} 保存する
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateRecipeForm;
