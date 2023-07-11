"use client";

import { useCallback, useState, useTransition } from "react";

import { createRecipe } from "@/src/actions/createRecipe";
import { Button } from "@/src/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Spinner from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { formSchema } from ".";

type NewRecipeFormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<NewRecipeFormValues> = {
  title: "",
  recipeImage: undefined,
  bio: "",
  ingredients: [{ name: "" }],
  instructions: [{ value: "" }],
  urls: [{ value: "" }],
  servingCount: 1,
};

const NewRecipeForm = () => {
  const [isPending, startTransition] = useTransition();

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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);

    startTransition(async () => {
      await createRecipe(data);
      form.reset();
    });
  };

  // const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;

  //   if (!files || files?.length === 0) {
  //     return;
  //   }
  //   return files[0];
  // }, []);

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
        <div className="w-fit self-start">
          <FormField
            control={form.control}
            name="recipeImage"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem className="grid w-full max-w-screen-sm">
                <FormLabel>レシピ画像</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="file"
                    placeholder="例：4"
                    onChange={(event) => {
                      if (event.target.files && event.target.files.length > 0) {
                        console.log(event.target.files[0]);
                        onChange(event.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
