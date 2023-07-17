"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

import { prisma } from "../lib/prisma";
import { Database } from "../types/SupabaseTypes";

// シェフをフォローする
export const followChef = async (formData: FormData) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました🥲");
  }

  const followedId = String(formData.get("followedId"));

  // 自身をフォローするのを防ぐ
  if (session.user.id === followedId) throw new Error("自分自身をフォロー・アンフォローすることはできません😡");

  await prisma.userFollower.create({
    data: {
      followerId: session.user.id,
      followedId,
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};

// シェフのフォローを外す
export const unFollowChef = async (formData: FormData) => {
  const supabaseServerClient = createServerActionClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (!session) {
    throw new Error("認証に失敗しました🥲");
  }

  const followedId = String(formData.get("followedId"));

  // 自身をフォローするのを防ぐ
  if (session.user.id === followedId) throw new Error("自分自身をフォロー・アンフォローすることはできません😡");

  await prisma.userFollower.delete({
    where: {
      followerId_followedId: {
        followerId: session.user.id,
        followedId,
      },
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};
