import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { prisma } from "@/src/lib/prisma";
import { Database } from "@/src/types/SupabaseTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function NewRecipe() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/mock/unauthenticated");
  }

  const addRecipe = async (formData: FormData) => {
    "use server";

    const title = String(formData.get("title"));
    const content = String(formData.get("content"));

    await prisma.recipe.create({
      data: {
        title,
        content,
        userId: session.user.id,
      },
    });

    revalidatePath("/mock");
  };

  return (
    <form action={addRecipe} className="flex flex-col items-center justify-center gap-2 pt-2">
      <h2 className="text-2xl font-extrabold self-start">レシピ追加</h2>

      <div className="grid w-full max-w-screen-sm items-center gap-1.5">
        <Label htmlFor="email-2">Title</Label>
        <Input name="title" placeholder="title" />
      </div>
      <div className="grid w-full max-w-screen-sm items-center gap-1.5">
        <Label htmlFor="email-2">Content</Label>
        <Textarea name="content" placeholder="content" />
      </div>
      <Button type="submit" className="self-end">
        Add
      </Button>
    </form>
  );
}
