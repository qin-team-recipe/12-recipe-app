import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import { Separator } from "@/src/components/ui/separator";

export const metadata = {
  title: "管理画面",
};
const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getAuthenticatedUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <>
      <Separator className="hidden h-full w-[1px] md:block" />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Separator className="hidden h-full w-[1px] md:block" />
    </>
  );
};

export default layout;
