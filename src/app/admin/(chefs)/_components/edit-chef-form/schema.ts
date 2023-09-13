import * as z from "zod";

export type EditChefFormValues = z.infer<typeof editChefFormSchema>;

export const editChefFormSchema = z.object({
  uid: z.string(),
  name: z.string().min(1, {
    message: "シェフ名は必須です",
  }),

  profileImage: z.string().optional(),

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
