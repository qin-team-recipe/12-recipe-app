import { revalidatePath } from "next/cache";

import getAuthenticatedUser from "@/src/actions/getAuthenticatedUser";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { prisma } from "@/src/lib/prisma";

export default async function NewRecipe() {
  const addRecipe = async (formData: FormData) => {
    "use server";
    const user = await getAuthenticatedUser();

    if (!user) {
      throw new Error("認証に失敗しました");
    }

    if (user.role !== "ADMIN") {
      throw new Error("権限がありません");
    }

    const title = String(formData.get("title"));
    const description = String(formData.get("description"));

    await prisma.recipe.create({
      data: {
        title,
        description,
        // TODO: シェフを指定できるようにする
        userId: user.id,
        servingCount: 1,
      },
    });

    revalidatePath("/mock");
  };

  return (
    <form action={addRecipe} className="flex flex-col items-center justify-center gap-2 pt-2">
      <h2 className="self-start text-2xl font-extrabold">レシピ追加</h2>

      <div className="grid w-full max-w-screen-sm items-center gap-1.5">
        <Label htmlFor="email-2">Title</Label>
        <Input name="title" placeholder="title" />
      </div>
      <div className="grid w-full max-w-screen-sm items-center gap-1.5">
        <Label htmlFor="email-2">Content</Label>
        <Textarea name="description" placeholder="content" />
      </div>
      <Button type="submit" className="self-end">
        Add
      </Button>
    </form>
  );
}
