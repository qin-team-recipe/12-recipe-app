import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

export const getAuthenticatedUser = async () => {
  const supabaseServerClient = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      profile: true,
      profileImage: true,
      UserLink: true,
      role: true,
    },
  });

  if (!user) {
    return null;
  }

  const followersCount = await prisma.userFollower.count({
    where: {
      followedId: user!.id,
    },
  });

  return {
    ...user,
    followersCount,
  };
};
