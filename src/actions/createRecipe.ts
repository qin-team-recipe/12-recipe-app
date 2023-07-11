"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { zact } from "zact/server";

import { formSchema } from "../app/mock/_components/new-recipe-form";
import { supabaseServerActionClient } from "../lib/supabase/supabase-server";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

export const createRecipe = zact(formSchema)(
  async ({ title, bio, ingredients, urls, servingCount, instructions, recipeImage }) => {
    const user = await getAuthenticatedUser();

    if (!user) {
      throw new Error("認証に失敗しました");
    }

    console.log(recipeImage);

    let imageUrl = "";
    if (recipeImage) {
      //画像をアップロードした場合
      const { data: storageData, error: storageError } = await supabaseServerActionClient.storage
        .from("recipe")
        .upload(`${user.id}/${uuidv4()}`, recipeImage);

      if (storageError) {
        throw new Error("画像のアップロードに失敗しました");
      }

      const { data: urlData } = await supabaseServerActionClient.storage.from("recipe").getPublicUrl(storageData.path);
      imageUrl = urlData.publicUrl;
    }

    // TODO: RecipeImageの追加
    await prisma.recipe.create({
      data: {
        title,
        description: bio,
        userId: user.id,
        servingCount: servingCount,
        RecipeImage: {
          create: {
            recipeImage: imageUrl,
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

    revalidatePath("/mock/tsuboi");
  }
);
