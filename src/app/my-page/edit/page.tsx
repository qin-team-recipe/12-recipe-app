import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";

import TopBar from "@/src/components/layout/top-bar";

import { EditFormValues, EditProfileForm } from "./_components/edit-profile-form";

const page = async () => {
  const user = await getAuthenticatedUser();

  if (!user) redirect("/login");

  const defaultValues: Partial<EditFormValues> = {
    nickName: user.name,
    bio: user.profile ?? "",
    urls: user.UserLink.map((link) => {
      return { id: link.id, value: link.url };
    }),
    profileImage: user.profileImage ?? undefined,
  };

  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">編集</h1>} />
      <EditProfileForm defaultValues={defaultValues} />
    </>
  );
};

export default page;
