import { cookies } from "next/headers";

import { Database } from "@/src/types/SupabaseTypes";
import { createClientComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const supabaseClient = createClientComponentClient<Database>();

export const supabaseRouteHandlerClient = createRouteHandlerClient<Database>({ cookies });
