"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import "cropperjs/dist/cropper.css";

import { postRecipe } from "@/src/actions/postRecipe";
import { recipeFormStateAtom } from "@/src/atoms/draftRecipeFormValuesAtom";
import { kToastDuration } from "@/src/constants/constants";
import { useUploadImage } from "@/src/hooks/useUploadImage";
import { cn, getPlainTextFromJSON } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Crop, CropIcon, Minus, Plus, PlusIcon, RefreshCw, X } from "lucide-react";
import Cropper, { type ReactCropperElement } from "react-cropper";
import { useFieldArray, useForm } from "react-hook-form";
import useDeepCompareEffect from "use-deep-compare-effect";
import { z } from "zod";

import InstructionMenu from "@/src/components/instruction-menu";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/src/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import Spinner from "@/src/components/ui/spinner";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";

import { createRecipeFormSchema, CreateRecipeFormValues } from ".";

type Props = {
  defaultValues: Partial<CreateRecipeFormValues>;
  redirectPath: string;
};

const CreateRecipeForm = ({ defaultValues, redirectPath }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);

  const { selectedImage, previewImageURL, setPreviewImageURL, uploadImage, clearImage } = useUploadImage(null);
  const router = useRouter();

  const searchParams = useSearchParams();

  const isDraft = searchParams.has("draftId");

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateRecipeFormValues>({
    resolver: zodResolver(createRecipeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [_, setDraftRecipeFormValues] = useAtom(recipeFormStateAtom);

  const { setValue, watch, handleSubmit } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const fileSizeInMB = file.size / (1024 * 1024);

        if (fileSizeInMB > 2) {
          form.setError("recipeImage", { type: "manual", message: "画像のサイズは2MB以下である必要があります。" });
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImageURL(reader.result as string);
          form.setError("recipeImage", { type: "manual", message: "" });
          setIsOpenCropDialog(true);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      if (error instanceof Error) {
        form.setError("recipeImage", { type: "manual", message: error.message });
      }
    }
  };

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
    setIsSubmitting(true);

    startTransition(async () => {
      try {
        if (selectedImage) {
          data.recipeImage = await uploadImage(selectedImage, "user");
        }

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
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          form.setError("recipeImage", { type: "manual", message: error.message });
        }
      }
    });
  };

  useDeepCompareEffect(() => {
    if (isDraft) {
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
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-0">
                      <FormLabel className={cn("mb-1 ml-3 flex items-center gap-3", index !== 0 && "sr-only")}>
                        <span className="text-lg font-bold">作り方</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative w-full flex-1">
                          <div className="absolute left-4 top-1/2 mt-px  flex h-5 w-5 shrink-0 -translate-y-1/2 select-none items-center justify-center rounded-full bg-tomato9 text-sm text-mauve1">
                            {stepOrder}
                          </div>
                          <p className="line-clamp-1 h-10 w-full overflow-hidden rounded-none border border-x-0 border-input bg-transparent px-12 py-2 leading-loose">
                            {getPlainTextFromJSON(field.value)}
                          </p>
                          <InstructionMenu
                            {...{
                              stepOrder,
                              index,
                              instructionsFields,
                              removeInstructions,
                              watchedValues,
                              setValue,
                              form,
                              fieldValue: isDraft && field.value !== "" ? JSON.parse(field.value) : field.value,
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
            onClick={() => appendInstructions({ value: "" })}
          >
            <PlusIcon size={16} />
            <span>工程を追加する</span>
          </button>
        </div>

        {/* レシピ画像 */}
        <FormField
          control={form.control}
          name="recipeImage"
          render={({ field }) => {
            const { onChange, value, ...restFieldProps } = field;

            return (
              <FormItem className=" ml-3 grid space-y-0">
                <FormLabel className="mb-1 text-lg font-bold">画像（任意）</FormLabel>
                <FormControl>
                  {previewImageURL ? (
                    <div className="flex items-end">
                      <div className="relative h-[100px] w-[100px]">
                        <Image
                          width={100}
                          height={100}
                          className="h-[100px] w-[100px] rounded-xl border border-border object-cover"
                          src={previewImageURL}
                          alt="プロフィール写真"
                        />
                        <button type="button" className="absolute -right-2 -top-1 z-50" onClick={clearImage}>
                          <Minus className="h-5 w-5 rounded-full bg-tomato9 p-1 text-white" />
                        </button>
                      </div>
                      <Dialog open={isOpenCropDialog} onOpenChange={setIsOpenCropDialog}>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" size="icon" className="h-7 w-7">
                            <Crop className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">Crop image</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          className="max-h-screen max-w-screen-md overflow-auto px-0"
                          closeOnOutsideClick={false}
                        >
                          <div className="mt-8 grid place-items-center space-y-5">
                            <div className="flex items-center justify-center">
                              <Cropper
                                ref={cropperRef}
                                className="object-cover"
                                zoomTo={0.8}
                                style={{ maxWidth: "100%", maxHeight: "450px", margin: "auto" }}
                                initialAspectRatio={1 / 1}
                                aspectRatio={1 / 1}
                                preview=".img-preview"
                                src={previewImageURL}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                guides={true}
                              />
                            </div>
                            <div className="flex w-fit items-center space-x-2">
                              <Button
                                aria-label="Crop image"
                                type="button"
                                size="sm"
                                className="h-8"
                                onClick={() => {
                                  if (cropperRef.current) {
                                    const croppedImageDataURL = cropperRef.current.cropper
                                      .getCroppedCanvas()
                                      .toDataURL();
                                    setPreviewImageURL(croppedImageDataURL);
                                    setIsOpenCropDialog(false);

                                    form.setValue("recipeImage", croppedImageDataURL);
                                  }
                                }}
                              >
                                <CropIcon size={12} className="mr-2" aria-hidden="true" />
                                切り取る
                              </Button>
                              <Button
                                aria-label="Reset crop"
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8"
                                onClick={() => {
                                  cropperRef.current?.cropper.reset();
                                }}
                              >
                                <RefreshCw size={12} className="mr-2" aria-hidden="true" />
                                リセット
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
          <Button variant={"destructive"} className="flex-1 gap-2" type="submit" disabled={isPending || isSubmitting}>
            {isPending && <Spinner />} 保存する
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateRecipeForm;
