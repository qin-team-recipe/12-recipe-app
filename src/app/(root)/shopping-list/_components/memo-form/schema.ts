import * as z from "zod";

export type MemoFormValues = z.infer<typeof memoFormSchema>;

export const memoFormSchema = z.object({
  memo: z.array(
    z.object({
      id: z.number(),
      text: z.string().min(1, {
        message: "入力してください",
      }),
      order: z.number().optional(),
      isCompleted: z.boolean(),
    })
  ),
});
