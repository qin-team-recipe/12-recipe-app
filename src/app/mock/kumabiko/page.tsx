import { getChefs } from "@/src/actions/getChefs";

const page = async () => {
  const chefs = await getChefs();
  console.log(chefs);

  return <div className="pt-4">テスト</div>;
};

export default page;
