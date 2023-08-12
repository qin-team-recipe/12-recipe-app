import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getAuthenticatedUser = async () => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerComponentClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/login");

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
