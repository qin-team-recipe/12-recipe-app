"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/src/lib/prisma";
import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

// シェフをフォローする
export const followChef = async (followedId: string): Promise<ActionsResult> => {
  const cookieStore = cookies();
  const {
    data: { session },
  } = await createServerActionClient<Database>({ cookies: () => cookieStore }).auth.getSession();

  if (!session) redirect("/favorite");

  try {
    // 自身をフォローするのを防ぐ
    if (session.user.id === followedId) {
      return {
        isSuccess: false,
        error: "自分自身をフォロー・アンフォローすることはできません😡",
      };
    }

    await prisma.userFollower.create({
      data: {
        followerId: session.user.id,
        followedId,
      },
    });

    // TODO: 適切なパスを指定する
    revalidatePath("/");

    return {
      isSuccess: true,
      message: "フォローしました🎉",
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "フォローに失敗しました🥲",
    };
  }
};

// シェフのフォローを外す
export const unFollowChef = async (followedId: string): Promise<ActionsResult> => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) redirect("/favorite");

  try {
    // 自身をフォローするのを防ぐ
    if (session.user.id === followedId) {
      return {
        isSuccess: false,
        error: "自分自身をフォロー・アンフォローすることはできません😡",
      };
    }

    await prisma.userFollower.delete({
      where: {
        followerId_followedId: {
          followerId: session.user.id,
          followedId,
        },
      },
    });

    // TODO: 適切なパスを指定する
    revalidatePath("/");

    return {
      isSuccess: true,
      message: "フォローを外しました😟",
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "フォローの外しに失敗しました🥲",
    };
  }
};
