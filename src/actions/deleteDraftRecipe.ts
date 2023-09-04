"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

type DeleteDraftRecipeResult = {
  isSuccess: boolean;
  error?: Error;
};

export const deleteDraftRecipe = async (id: string): Promise<DeleteDraftRecipeResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/favorite");

  try {
    // 物理削除
    await prisma.$transaction([
      prisma.draftRecipeImage.deleteMany({
        where: {
          draftRecipeId: id,
        },
      }),
      prisma.draftRecipeLink.deleteMany({
        where: {
          draftRecipeId: id,
        },
      }),
      prisma.draftInstruction.deleteMany({
        where: {
          draftRecipeId: id,
        },
      }),
      prisma.draftIngredient.deleteMany({
        where: {
          draftRecipeId: id,
        },
      }),
      prisma.draftRecipe.delete({
        where: {
          id,
        },
      }),
    ]);

    revalidatePath("/my-recipe/drafts");

    return { isSuccess: true };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: error as Error };
  }
};
