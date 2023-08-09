import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getMemos = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

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
