import TopBar from "@/src/components/layout/top-bar";

const page = () => {
  return (
    <>
      <TopBar centerComponent={<div className="md:text-xl font-bold">買い物リスト</div>} />
    </>
  );
};

export default page;
