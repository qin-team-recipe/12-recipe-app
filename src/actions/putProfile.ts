"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { zact } from "zact/server";

import { editProfileFormSchema } from "../app/my-page/edit/_components/edit-profile-form/schema";
import { ActionsResult } from "../types/ActionsResult";
import { Database } from "../types/SupabaseTypes";

export const putProfile = zact(editProfileFormSchema)(async ({ nickName, bio, urls }): Promise<ActionsResult> => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) notFound();

  const currentUserLinks = await prisma.userLink.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const toBeDeletedUrls = currentUserLinks.filter((link) => !urls.some((url) => url?.id === link.id));
  const toBeUpdatedUrls = urls.filter((url) => url?.id !== undefined);
  const toBeCreatedUrls = urls.filter((url) => url?.id === undefined);

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: nickName,
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

    revalidatePath("/my-page");

    return {
      isSuccess: true,
      message: "プロフィールを更新しました🎉",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: "プロフィールの更新に失敗しました🥲",
    };
  }
});
