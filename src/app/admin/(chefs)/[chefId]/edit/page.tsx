import { redirect } from "next/navigation";

import { getChefById } from "@/src/actions/getChefById";

import TopBar from "@/src/components/layout/top-bar";

import { EditChefForm, EditChefFormValues } from "../../_components/edit-chef-form";

const page = async ({ params }: { params: { chefId: string } }) => {
  const chef = await getChefById({
    id: params.chefId,
  });

  const defaultValues: Partial<EditChefFormValues> = {
    uid: chef.id,
    name: chef.name,
    bio: chef.profile ?? "",
    urls: chef.UserLink.map((link) => {
      return { id: link.id, value: link.url };
    }),
  };

  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">シェフの編集</h1>} />
      <EditChefForm defaultValues={defaultValues} />
    </>
  );
};

export default page;
