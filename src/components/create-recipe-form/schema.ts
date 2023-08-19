import { JsonValue } from "@/src/types/json";
import * as z from "zod";

export type CreateRecipeFormValues = z.infer<typeof createRecipeFormSchema>;

export type CreateDraftRecipeFormValues = z.infer<typeof createDraftRecipeFormSchema>;

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
const jsonSchema: z.ZodSchema<JsonValue> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const createRecipeFormSchema = z.object({
  uid: z.string(),

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
      value: jsonSchema.refine(
        (value) => {
          return value !== null && value !== undefined && Object.keys(value).length > 0;
        },
        {
          message: "作り方は必須です",
        }
      ),
      id: z.number().optional(),
      order: z.number().optional(),
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

export const createDraftRecipeFormSchema = z.object({
  uid: z.string(),
  title: z.string().optional(),
  servingCount: z.number().int().optional(),
  recipeImage: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().optional(),
      })
    )
    .optional(),
  instructions: z
    .array(
      z.object({
        value: jsonSchema.optional(),
      })
    )
    .optional(),
  bio: z.string().optional(),
  urls: z
    .array(
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
    )
    .optional(),
});
