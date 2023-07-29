import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import type { Database } from "@/src/types/SupabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// サインアップ後のリダイレクト先
export async function GET(request: NextRequest) {
  // URL取得
  const requestUrl = new URL(request.url);

  // 認証コード取得
  const code = requestUrl.searchParams.get("code");

  console.log("コード");

  if (code) {
    // Supabaseのクライアントインスタンスを作成
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // 認証コードをセッショントークンに交換
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
