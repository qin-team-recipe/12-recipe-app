import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getFollowingChefs = async () => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました🥲");
  }

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
