"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";
import getAuthenticatedUser from "./getAuthenticatedUser";

// シェフをフォローする
const followChef = async (formData: FormData) => {
  const authenticatedUser = await getAuthenticatedUser();

  if (!authenticatedUser) throw new Error("認証に失敗しました🥲");

  const followedId = String(formData.get("followedId"));

  await prisma.userFollower.create({
    data: {
      followerId: authenticatedUser.id,
      followedId,
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};

// シェフのフォローを外す
const unFollowChef = async (formData: FormData) => {
  const authenticatedUser = await getAuthenticatedUser();

  if (!authenticatedUser) throw new Error("認証に失敗しました🥲");

  const followedId = String(formData.get("followedId"));

  await prisma.userFollower.delete({
    where: {
      followerId_followedId: {
        followerId: authenticatedUser.id,
        followedId,
      },
    },
  });

  // TODO: 適切なパスを指定する
  revalidatePath("/mock");
};

export { followChef, unFollowChef };
