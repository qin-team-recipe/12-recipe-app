"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/src/lib/prisma";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { zact } from "zact/server";

import { formSchema } from "../app/mock/_components/new-recipe-form";
import { Database } from "../types/SupabaseTypes";

type CreateRecipeResult = {
  isSuccess: boolean;
  error?: Error;
};

export const createRecipe = zact(formSchema)(
  async ({ title, bio, ingredients, urls, servingCount, instructions }): Promise<CreateRecipeResult> => {
    const supabaseServerClient = createServerActionClient<Database>({ cookies });

    const {
      data: { session },
    } = await supabaseServerClient.auth.getSession();

    if (!session) {
      throw new Error("認証に失敗しました");
    }

    // TODO: RecipeImageの追加
    try {
      await prisma.recipe.create({
        data: {
          title,
          description: bio,
          userId: session.user.id,
          servingCount: servingCount,
          Ingredient: {
            create: ingredients.map((ingredient) => ({
              title: ingredient.name,
            })),
          },
          Instruction: {
            create: instructions.map((instruction, index) => ({
              stepOrder: index + 1,
              stepDescription: instruction.value,
            })),
          },
          ...(urls.find((url) => url!.value != "") && {
            RecipeLink: {
              create: urls.map((url) => ({
                linkUrl: url!.value ?? "",
              })),
            },
          }),
        },
      });
      revalidatePath("/mock/tsuboi");

      return { isSuccess: true };
    } catch (error) {
      console.log(error);
      return { isSuccess: false, error: error as Error };
    }
  }
);
