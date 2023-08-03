import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getMemos = async () => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) redirect("/login");

  const memos = await prisma.memo.findMany({
    select: {
      id: true,
      userId: true,
      title: true,
      isCompleted: true,
    },
    where: {
      userId: session.user.id,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return memos;
};
