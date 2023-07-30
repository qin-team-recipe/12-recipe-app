"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";

type PostUserResult = {
  isSuccess: boolean;
  error?: Error;
};

export const postUser = async ({ id, name }: { id?: string; name: string }): Promise<PostUserResult> => {
  try {
    await prisma.user.create({
      data: {
        id: id,
        name: name,
        role: "USER",
      },
    });

    revalidatePath("/signup");

    return {
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: error as Error };
  }
};
