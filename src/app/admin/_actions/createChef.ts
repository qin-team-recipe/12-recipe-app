"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { zact } from "zact/server";

import { createChefFormSchema } from "../(chefs)/_components/create-chef-form";

type CreateChefResult = {
  isSuccess: boolean;
  error?: Error;
};

export const createChef = zact(createChefFormSchema)(async ({ name, bio, urls }): Promise<CreateChefResult> => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました");
  }

  const currentUserLinks = await prisma.userLink.findMany({
    where: {
      userId: session.user.id,
    },
  });

  try {
    await prisma.user.create({
      data: {
        name: name,
        profile: bio,
        UserLink: {
          create: urls.map((url) => ({
            url: url?.value ?? "",
          })),
        },
      },
    });

    revalidatePath("/mock/tsuboi");

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
