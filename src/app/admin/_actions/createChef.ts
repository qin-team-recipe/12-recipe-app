"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/src/lib/prisma";
import { zact } from "zact/server";

import { createChefFormSchema } from "../(chefs)/_components/create-chef-form";

type CreateChefResult = {
  isSuccess: boolean;
  error?: Error;
};

export const createChef = zact(createChefFormSchema)(async ({ name, bio, urls }): Promise<CreateChefResult> => {
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
