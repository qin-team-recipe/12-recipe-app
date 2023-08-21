import Link from "next/link";

import { getChefById } from "@/src/actions/getChefById";
import { X } from "lucide-react";

import { CreateRecipeForm, CreateRecipeFormValues } from "@/src/components/create-recipe-form";
import TopBar from "@/src/components/layout/top-bar";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await getChefById({ id: params.id });

  const defaultValues: Partial<CreateRecipeFormValues> = {
    uid: id,
    title: "",
    bio: "",
    ingredients: [{ name: "" }],
    instructions: [{ value: "" }],
    urls: [{ value: "" }],
    servingCount: 1,
  };

  return (
    <>
      <TopBar
        leadingComponent={
          <Link href="/admin">
            <X size={20} />
          </Link>
        }
      />
      <CreateRecipeForm defaultValues={defaultValues} redirectPath="/admin" />
    </>
  );
};

export default page;
