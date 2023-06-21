import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: Request) {
  // `/auth/callback` ルートは Auth Helpers パッケージによって実装されたサーバーサイドの認証フローに必要
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // サインインプロセスが完了した後にリダイレクトするURL
  return NextResponse.redirect(requestUrl.origin);
}
