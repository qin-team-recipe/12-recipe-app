import TopBar from "@/src/components/layout/top-bar";

import CreateChefForm from "../_components/create-chef-form/create-chef-form";

const page = async () => {
  return (
    <>
      <TopBar centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">シェフを作成</h1>} />
      <CreateChefForm />
    </>
  );
};

export default page;
