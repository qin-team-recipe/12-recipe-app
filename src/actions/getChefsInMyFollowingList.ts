import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getChefsInMyFollowingList = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/favorite");

  const followingChefs = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      profileImage: true,
    },
    where: {
      role: "CHEF",
      followers: {
        some: {
          followerId: session.user.id,
        },
      },
    },
    orderBy: {
      name: "desc",
    },
  });

  return followingChefs;
};
