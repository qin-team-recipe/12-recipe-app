import { cookies } from "next/headers";

import { Database } from "@/src/types/SupabaseTypes";
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabaseServerClient = createServerComponentClient<Database>({ cookies });

export const supabaseServerActionClient = createServerActionClient<Database>({ cookies });
