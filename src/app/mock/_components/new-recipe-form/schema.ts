import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "タイトルは必須です",
  }),
  description: z.string().min(1, {
    message: "説明は必須です",
  }),
});
