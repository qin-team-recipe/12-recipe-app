import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";

const page = async () => {
  return (
    <div className="mb-20 p-8 pt-4">
      <h4 className="text-xl font-medium leading-none">🙌 Hello モック画面 🙌</h4>
      <Separator className="my-4" />
      <div className="flex gap-4">
        <Link href="/mock/kumabiko" className="flex items-center gap-2">
          <Button variant={"outline"}>kumabiko</Button>
        </Link>
        <Link href="/mock/kame" className="flex items-center gap-2">
          <Button variant={"outline"}>kame</Button>
        </Link>
        <Link href="/mock/tsuboi" className="flex items-center gap-2">
          <Button variant={"outline"}>tsuboi</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
