import * as z from "zod";

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const signUpFormSchema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});
