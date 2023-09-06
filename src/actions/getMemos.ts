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

  if (!session) redirect("/favorite");

  const memos = await prisma.memo.findMany({
    select: {
      id: true,
      userId: true,
      title: true,
      isCompleted: true,
      order: true,
    },
    where: {
      userId: session.user.id,
    },
    orderBy: {
      order: "asc",
    },
  });

  return memos;
};
