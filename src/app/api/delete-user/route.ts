import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

export type ApiResponse = { message: string } | { error: string };

// 退会機能
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const supabaseClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false },
    }
  );

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error("Error:", sessionError);
    return NextResponse.json({ error: "セッションが見つかりませんでした🥲" }, { status: 500 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { profileImage: true },
    });

    const profilePath = getProfilePath(user?.profileImage ?? null);

    // サーバー側のセッションを削除するためサインアウトさせる
    await supabase.auth.signOut();
    await supabaseClient.auth.admin.signOut(session.access_token);

    await supabaseClient.auth.admin.deleteUser(session.user.id);
    await prisma.user.delete({ where: { id: session.user.id } });
    if (profilePath) {
      await supabaseClient.storage.from("user").remove([profilePath]);
    }

    return NextResponse.json({ message: "退会しました🔥" }, { status: 200 });
  } catch (error) {
    console.error("Error during user deletion:", error);
    return NextResponse.json({ error: "退会に失敗しました🥲" }, { status: 500 });
  }
}

const getProfilePath = (profileImageUrl?: string | null) => {
  if (!profileImageUrl) return null;
  return profileImageUrl.split("/").slice(-1)[0];
};
