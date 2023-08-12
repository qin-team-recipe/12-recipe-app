"use server";

import { revalidatePath } from "next/cache";

import { editChefFormSchema } from "@/src/app/admin/(chefs)/_components/edit-chef-form";
import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { zact } from "zact/server";

export const putChef = zact(editChefFormSchema)(async ({ uid, name, bio, urls }): Promise<ActionsResult> => {
  const currentUserLinks = await prisma.userLink.findMany({
    where: {
      userId: uid,
    },
  });

  const toBeDeletedUrls = currentUserLinks.filter((link) => !urls.some((url) => url?.id === link.id));
  const toBeUpdatedUrls = urls.filter((url) => url?.id !== undefined);
  const toBeCreatedUrls = urls.filter((url) => url?.id === undefined);

  try {
    await prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        name: name,
        profile: bio,
        UserLink: {
          deleteMany: toBeDeletedUrls.map((url) => ({ id: url.id })),
          updateMany: toBeUpdatedUrls.map((url) => ({
            where: { id: url!.id },
            data: { url: url?.value ?? "" },
          })),
          create: toBeCreatedUrls.map((url) => ({
            url: url?.value ?? "",
          })),
        },
      },
    });

    revalidatePath("/admin");

    return {
      isSuccess: true,
      message: `${name} シェフの情報を更新しました🎉`,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: `${name} シェフの情報の更新に失敗しました🥲`,
    };
  }
});
