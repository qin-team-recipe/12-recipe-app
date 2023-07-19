import { getChefs } from "@/src/actions/getChefs";

import { DataTableDemo } from "./_components/chefs-data-table";

const page = async () => {
  const chefs = await getChefs();

  return (
    <div className="p-4">
      <DataTableDemo data={chefs} />
    </div>
  );
};

export default page;
