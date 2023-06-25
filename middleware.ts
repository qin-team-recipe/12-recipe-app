import { NextResponse, type NextRequest } from "next/server";

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // cookie を使用するように構成された Supabase クライアントを作成する
  const supabase = createMiddlewareClient({ req, res });

  // セッションの有効期限が切れている場合は、セッションを更新する - Server Components に必要
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  return res;
}
