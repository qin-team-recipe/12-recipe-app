"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { zact } from "zact/server";

import { createChefFormSchema } from "@/src/app/admin/(chefs)/_components/create-chef-form";

export const postChef = zact(createChefFormSchema)(async ({ name, bio, urls }): Promise<ActionsResult> => {
  try {
    await prisma.user.create({
      data: {
        name: name,
        profile: bio,
        role: "CHEF",
        UserLink: {
          create: urls.map((url) => ({
            url: url?.value ?? "",
          })),
        },
      },
    });

    revalidatePath("/admin");

    return {
      isSuccess: true,
      message: "シェフを登録しました🎉",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: "シェフの登録に失敗しました🥲",
    };
  }
});
