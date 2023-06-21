import LinkableTabs from "@/src/components/linkable-tabs";

import { tabs } from "../_constants/tabs";

const page = () => {
  return (
    <>
      <LinkableTabs tabs={tabs}>シェフ</LinkableTabs>
    </>
  );
};

export default page;
