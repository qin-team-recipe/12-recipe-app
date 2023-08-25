import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getDraftRecipes = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) notFound();

  const draftRecipes = await prisma.draftRecipe.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return draftRecipes;
};
