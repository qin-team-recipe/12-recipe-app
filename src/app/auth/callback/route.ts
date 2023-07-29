import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import type { Database } from "@/src/types/SupabaseTypes";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// `/auth/callback` ルートは Auth Helpers パッケージによって実装されたサーバーサイドの認証フローに必要
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
export async function GET(request: NextRequest) {
  // URL取得
  const requestUrl = new URL(request.url);

  // 認証コード取得
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // Supabaseのクライアントインスタンスを作成
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // 認証コードをセッショントークンに交換
    await supabase.auth.exchangeCodeForSession(code);
  }

  // サインインプロセスが完了した後にリダイレクトするURL
  return NextResponse.redirect(requestUrl.origin);
}
