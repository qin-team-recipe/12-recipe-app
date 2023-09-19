import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { ApiResponse } from "@/src/types/ApiResponse";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      await supabase.auth.signOut();
      return NextResponse.json({ message: "ログアウトに成功しました🔥" }, { status: 200 });
    }

    return NextResponse.json({ message: "既にログアウトしています🥲" }, { status: 500 });
  } catch (error) {
    console.error("Error during user deletion:", error);
    return NextResponse.json({ error: "ログアウトに失敗しました🥲" }, { status: 500 });
  }
}
