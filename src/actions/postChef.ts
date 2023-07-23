"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { zact } from "zact/server";

import { createChefFormSchema } from "../app/admin/(chefs)/_components/create-chef-form";

type PostChefResult = {
  isSuccess: boolean;
  error?: Error;
};

export const postChef = zact(createChefFormSchema)(async ({ name, bio, urls }): Promise<PostChefResult> => {
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
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: error as Error,
    };
  }
});
