"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Database } from "@/src/types/SupabaseTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: "jon@supabase.com",
      password: "sup3rs3cur3",
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email: "user2@test.com",
      password: "test123",
    });

    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    router.refresh();
  };

  return (
    <div className="flex gap-2 p-4">
      <Button onClick={handleSignUp}>Sign up</Button>
      <Button onClick={handleSignIn}>Sign in</Button>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
}
