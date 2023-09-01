import * as z from "zod";

export type CartListItemFormValues = z.infer<typeof cartListItemFormSchema>;

export const cartListItemFormSchema = z.object({
  cartListItem: z.array(
    z.object({
      id: z.number(),
      ingredient: z.string().min(1, {
        message: "入力してください",
      }),
      order: z.number().optional(),
      isCompleted: z.boolean(),
      isCustom: z.boolean(),
    })
  ),
});
