"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { zact } from "zact/server";

import { createRecipeFormSchema } from "../components/create-recipe-form";
import { ActionsResult } from "../types/ActionsResult";
import { Database } from "../types/SupabaseTypes";

export const postRecipe = zact(createRecipeFormSchema)(
  async ({ uid, title, bio, ingredients, urls, servingCount, instructions, recipeImage }): Promise<ActionsResult> => {
    const supabaseServerClient = createServerActionClient<Database>({ cookies });

    const {
      data: { session },
    } = await supabaseServerClient.auth.getSession();

    if (!session) redirect("/login");

    try {
      await prisma.recipe.create({
        data: {
          title,
          description: bio,
          userId: uid,
          servingCount: servingCount,
          RecipeImage: {
            create: {
              recipeImage: recipeImage ?? "",
            },
          },
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

      // TODO: 適切なパスを指定する
      revalidatePath("/mock/tsuboi");

      return {
        isSuccess: true,
        message: "レシピの作成に成功しました🎉",
      };
    } catch (error) {
      console.log(error);
      return { isSuccess: false, error: "レシピの作成に失敗しました🥲" };
    }
  }
);
