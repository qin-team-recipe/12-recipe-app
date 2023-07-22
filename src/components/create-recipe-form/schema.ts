import * as z from "zod";

export type CreateRecipeFormValues = z.infer<typeof createRecipeFormSchema>;

export const createRecipeFormSchema = z.object({
  title: z.string().min(1, {
    message: "タイトルは必須です",
  }),

  servingCount: z.number().int().min(1, {
    message: "1人前以上を入力してください",
  }),

  recipeImage: z.string().optional(),

  ingredients: z.array(
    z.object({
      name: z.string().min(1, {
        message: "材料名は必須です",
      }),
    })
  ),

  instructions: z.array(
    z.object({
      value: z.string().min(1, {
        message: "作り方は必須です",
      }),
    })
  ),

  bio: z.string().max(160, {
    message: "160文字以内で入力してください",
  }),

  urls: z.array(
    z
      .object({
        value: z
          .string()
          .optional()
          .refine((value) => {
            if (!value) return true;
            const parseResult = z.string().url().safeParse(value);
            return parseResult.success;
          }, "正しいURLを入力してください"),
      })
      .optional()
  ),
});
