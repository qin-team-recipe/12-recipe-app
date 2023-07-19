import * as z from "zod";

export type CreateChefFormValues = z.infer<typeof createChefFormSchema>;

export const createChefFormSchema = z.object({
  name: z.string().min(1, {
    message: "ニックネームは必須です",
  }),

  // TODO: 画像のバリデーション

  bio: z
    .string()
    .max(160, {
      message: "160文字以内で入力してください",
    })
    .optional(),

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
        id: z.number().optional(),
      })
      .optional()
  ),
});
