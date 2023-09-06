import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";

import TopBar from "@/src/components/layout/top-bar";

import SignUpForm from "./_components/signup-form";

const SignUpPage = async () => {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect("/");
  }

  const defaultValues = { name: "" };

  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">新規登録</h1>} />
      <SignUpForm defaultValues={defaultValues} />
    </>
  );
};

export default SignUpPage;
