import * as z from "zod";

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});
