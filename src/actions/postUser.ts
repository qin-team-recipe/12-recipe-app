"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { ActionsResult } from "../types/ActionsResult";

export const postUser = async ({ id, name }: { id?: string; name: string }): Promise<ActionsResult> => {
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
      message: "ユーザー登録が完了しました🎉",
    };
  } catch (error) {
    console.log(error);
    return { isSuccess: false, error: "ユーザー登録に失敗しました🥲" };
  }
};
