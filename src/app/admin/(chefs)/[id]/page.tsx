import { getChefById } from "@/src/actions/getChefById";

const page = async ({ params }: { params: { id: string } }) => {
  const chef = await getChefById({
    id: params.id,
  });

  return <>page</>;
};

export default page;
