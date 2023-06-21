import LinkableTabs from "@/src/components/linkable-tabs";

import { tabs } from "../_constants/tabs";

const page = () => {
  return (
    <>
      <LinkableTabs tabs={tabs}>レシピ</LinkableTabs>
    </>
  );
};

export default page;
