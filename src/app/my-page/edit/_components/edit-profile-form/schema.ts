import { IMAGE_TYPES } from "@/src/constants/constants";
import * as z from "zod";

const MAX_SIZE_MB = 2;
export type EditFormValues = z.infer<typeof editProfileFormSchema>;

export const editProfileFormSchema = z.object({
  nickName: z.string().min(1, {
    message: "ニックネームは必須です",
  }),
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
  selectedImage: z
    .custom<File>()
    .refine((file) => file.length !== 0, { message: "画像をアップロードしてください" })
    .refine((file) => file.size < MAX_SIZE_MB * 1024 * 1024, { message: "画像サイズを2MB以下にする必要があります。" })
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: "画像はjpgまたはpng形式である必要があります。",
    })
    .optional(),
  profileImageUrl: z.string().nullable(),
});
