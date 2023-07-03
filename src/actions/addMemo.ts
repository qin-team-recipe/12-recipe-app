"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import { getAuthenticatedUser } from "./getAuthenticatedUser";

const addMemo = async (formData: FormData) => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("認証に失敗しました");
  }

  const title = String(formData.get("title"));

  await prisma.memo.create({
    data: {
      userId: user.id,
      title,
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};

export default addMemo;
